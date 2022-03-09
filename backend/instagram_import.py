import os
from dotenv import load_dotenv
from pprint import pprint
import instagram_scraper

# import pymongo
# import urllib.parse
# from pymongo import MongoClient
# from newsapi.newsapi_client import NewsApiClient

# load dotenv lib
load_dotenv()

# Instagram config
IG_USER = os.getenv('IG_USER')
IG_PASS = os.getenv('IG_PASS')

# MongoDB config
MongoDB_USER = os.getenv('MongoDB_USER')
MongoDB_PASS = os.getenv('MongoDB_PASS')
MongoDB_CLUSTER = os.getenv('MongoDB_CLUSTER')

# Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
# client = MongoClient('mongodb+srv://' + MongoDB_USER + ':' + MongoDB_PASS + '@' + MongoDB_CLUSTER + '/frontend?retryWrites=true&w=majority')

args = {"login_user": IG_USER, "login_pass": IG_PASS, "cookiejar":"true"}

insta_scraper = instagram_scraper.InstagramScraper(**args)
insta_scraper.authenticate_with_login()
shared_data = insta_scraper.get_shared_data_userinfo(username='thecryptograph')

arr = []

for item in insta_scraper.query_media_gen(shared_data):
    print(insta_scraper.get_original_image(item))
    insta_scraper.download(item, '../cdn')
    # arr.append(item)
    break

pprint(arr)