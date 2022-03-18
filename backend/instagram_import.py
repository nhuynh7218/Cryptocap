import os, pymongo, urllib.parse, datetime, instagram_scraper, secrets
from dotenv import load_dotenv
from pprint import pprint
from pymongo import MongoClient

# load dotenv lib
load_dotenv()

# Instagram config
IG_USER1 = os.getenv('IG_USER1')
IG_USER2 = os.getenv('IG_USER2')
IG_USER3 = os.getenv('IG_USER3')
ig_pass = os.getenv('IG_PASS')

# MongoDB config
MongoDB_USER = os.getenv('MongoDB_USER')
MongoDB_PASS = os.getenv('MongoDB_PASS')
MongoDB_CLUSTER = os.getenv('MongoDB_CLUSTER')

# Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
client = MongoClient('mongodb+srv://' + MongoDB_USER + ':' + MongoDB_PASS + '@' + MongoDB_CLUSTER + '/frontend?retryWrites=true&w=majority')

# call mongodb func
db = client['frontend']

# select collection
collection = db['news']

usernames = [IG_USER1, IG_USER2, IG_USER3]
ig_username = secrets.choice(usernames)
args = {"login_user": ig_username, "login_pass": ig_pass, "cookiejar":"true"}

insta_scraper = instagram_scraper.InstagramScraper(**args)
insta_scraper.authenticate_with_login()
shared_data = insta_scraper.get_shared_data_userinfo(username='thecryptograph')

x=1
for item in insta_scraper.query_media_gen(shared_data):
    # first document
    caption_text = item['edge_media_to_caption']['edges'][0]['node']['text']
    post_image = insta_scraper.download(item, 'cdn')
    document = {
      "title": caption_text[:80],
      "description": caption_text[:260] + "...",
      "image": "https://cdn.crypto.ardi.dev/" + post_image[0],
      "source": "TheCryptoGraph",
      "content": caption_text,
      "url": "https://www.instagram.com/p/" + item['shortcode'],
      "published": datetime.datetime.fromtimestamp(item['taken_at_timestamp'])
    }

    exists = collection.count_documents({ "url": document['url'] }) > 0
    if(exists == False):
        collection.insert_one(document)
        print("\n Imported ",x, " - ", document['url'], "\n")
        x+=1
    else:
        print("\n IG News already imported. Skipped.")

    if(x==10):
        break
    # print(document)
