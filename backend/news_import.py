import os, newsapi, pymongo, datetime
from dotenv import load_dotenv
from pymongo import MongoClient
from newsapi.newsapi_client import NewsApiClient

# load dotenv lib
load_dotenv()

# NewsAPI API
NewsAPI_KEY = os.getenv('NEWSAPI_KEY')

# MongoDB config
MongoDB_USER = os.getenv('MongoDB_USER')
MongoDB_PASS = os.getenv('MongoDB_PASS')
MongoDB_CLUSTER = os.getenv('MongoDB_CLUSTER')
MongoDB_NAME = os.getenv('MongoDB_NAME')

# Init
newsapi = NewsApiClient(api_key=NewsAPI_KEY)

# Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
client = MongoClient('mongodb+srv://' + MongoDB_USER + ':' + MongoDB_PASS + '@' + MongoDB_CLUSTER + '/frontend?retryWrites=true&w=majority')

# call mongodb func
db = client[MongoDB_NAME]

# select collection
collection = db['news']

# /v2/get_everything, and select articles
sources = newsapi.get_everything(q='crypto', page=1, page_size=10)
posts = sources['articles']
x=1
# loop through the posts array (10)
for post in posts:
    # first document
    # format date
    published_date = datetime.datetime.strptime(post['publishedAt'], "%Y-%m-%dT%H:%M:%SZ")
    document = {
      "title": post['title'],
      "description": post['description'],
      "image": post['urlToImage'],
      "source": post['source']['name'],
      "content": post['content'],
      "url": post['url'],
      "published": published_date
    }

    # check if post exists in the mongodb 
    exists = collection.count_documents({ "url": document['url'] }) > 0
    if(exists == False):
        collection.insert_one(document)
        print("\n Imported ",x, " - ", document['url'], "\n")
        x+=1
    else:
        print("\n News already imported. Skipped.")