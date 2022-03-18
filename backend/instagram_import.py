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
# client = MongoClient('mongodb+srv://' + MongoDB_USER + ':' + MongoDB_PASS + '@' + MongoDB_CLUSTER + '/frontend?retryWrites=true&w=majority')

# import json

usernames = [IG_USER1, IG_USER2, IG_USER3]
ig_username = secrets.choice(usernames)
args = {"login_user": ig_username, "login_pass": ig_pass}
# , "cookiejar":"true"

insta_scraper = instagram_scraper.InstagramScraper(**args)
insta_scraper.authenticate_with_login()
shared_data = insta_scraper.get_shared_data_userinfo(username='thecryptograph')

for item in insta_scraper.query_media_gen(shared_data):
    # print(insta_scraper.get_original_image(item))
    # insta_scraper.download(item, '../cdn')
    # first document
    # published_date = datetime.datetime.strptime(, "%Y-%m-%dT%H:%M:%SZ")
    # caption_text = item['edge_media_to_caption']['edges'][0]['node']['text']
    # document = {
    #   "title": "Title",
    #   "description": caption_text[:260] + "...",
    #   "image": item['display_url'],
    #   "source": "TheCryptoGraph",
    #   "content": caption_text,
    #   "url": "# https://www.instagram.com/p/" + item['shortcode'],
    #   "published": item['taken_at_timestamp']
    # }

    # insta_scraper.download(item, '../cdn')

    print(item)
    break
