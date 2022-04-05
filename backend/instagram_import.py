import os, pymongo, datetime, instagram_scraper, secrets
from dotenv import load_dotenv
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
MongoDB_NAME = os.getenv('MongoDB_NAME')

# Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
client = MongoClient('mongodb+srv://' + MongoDB_USER + ':' + MongoDB_PASS + '@' + MongoDB_CLUSTER + '/frontend?retryWrites=true&w=majority')

# call mongodb func
db = client[MongoDB_NAME]

# select collection
collection = db['news']

# create a username array
usernames = [IG_USER1, IG_USER2, IG_USER3]

# select a random username from array
ig_username = secrets.choice(usernames)
args = {"login_user": ig_username, "login_pass": ig_pass, "cookiejar":"true"}

# pass arhs and authticate login
insta_scraper = instagram_scraper.InstagramScraper(**args)
insta_scraper.authenticate_with_login()

# select instagram username that we are going to scrap data from
shared_data = insta_scraper.get_shared_data_userinfo(username='thecryptograph')

# first document
x=1
for item in insta_scraper.query_media_gen(shared_data):
    # scrapes the content/caption
    caption_text = item['edge_media_to_caption']['edges'][0]['node']['text']

    # split caption if new line is found
    title = caption_text
    title = title.split('\n')

    # download the instagram post media, due to link expiring
    post_image = insta_scraper.download(item, 'cdn')
    document = {
      "title": title[0][:80],
      "description": caption_text[:260] + "...",
      "image": "https://cdn.cryptocap.digital/" + post_image[0],
      "source": "TheCryptoGraph",
      "content": caption_text,
      "url": "https://www.instagram.com/p/" + item['shortcode'],
      "published": datetime.datetime.fromtimestamp(item['taken_at_timestamp'])
    }

    # check if post exists in the mongodb 
    exists = collection.count_documents({ "url": document['url'] }) > 0
    if(exists == False):
        collection.insert_one(document)
        print("\n Imported ",x, " - ", document['url'], "\n")
    else:
        print("\n IG News already imported. Skipped.")
    x+=1

    if(x==10):
        break
    # print(document)
