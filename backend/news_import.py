import os, newsapi, pymongo, urllib.parse, datetime
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

# Init
newsapi = NewsApiClient(api_key=NewsAPI_KEY)

# Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
client = MongoClient('mongodb+srv://' + MongoDB_USER + ':' + MongoDB_PASS + '@' + MongoDB_CLUSTER + '/frontend?retryWrites=true&w=majority')

# call mongodb func
db = client['frontend']

# select collection
collection = db['news']
  
# /v2/get_everything
sources = newsapi.get_everything(q='crypto', page=1, page_size=5)
posts = sources['articles']
x=1
for post in posts:
    # first document
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

    exists = collection.count_documents({ "url": document['url'] }) > 0
    if(exists == False):
        collection.insert_one(document)
        print("\n Imported ",x, " - ", document['url'], "\n")
        x+=1
    else:
        print("\n News already imported. Skipped.")

    # print("Title:", post['title'].lower())
    # print("Description:", post['description'])
    # print("Image:", post['urlToImage'])
    # print("Published:", post['publishedAt'])
    # print("Source:", post['source']['name'])
    # print("Content:", post['content'])
    # print('URL: ', post['url'])
    # break