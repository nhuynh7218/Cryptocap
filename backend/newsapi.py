import newsapi
import pymongo
import urllib.parse
from pymongo import MongoClient
from newsapi import NewsApiClient

# Init newsapi lib
newsapi = NewsApiClient(api_key='03c5e649e30745138c3c93de33b8ad56')

# Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
client = MongoClient('mongodb+srv://cryptocap:abc123abc@cluster0.go9eq.mongodb.net/frontend?retryWrites=true&w=majority')

# call mongodb function and select database name
db = client['frontend']

# select collection
collection = db['news']
  
# /v2/get_everything
sources = newsapi.get_everything(q='crypto', page=1, page_size=5)
posts = sources['articles']
x=0
for post in posts:
    # first document
    document = {
      "title": post['title'],
      "description": post['description'],
      "image": post['urlToImage'],
      "source": post['source']['name'],
      "content": post['content'],
      "url": post['url'],
      "published": post['publishedAt']
    }
    
    collection.insert_one(document)
    print("\n Imported ", x, "\n")
    x+=1
    # print("Title:", post['title'].lower())
    # print("Description:", post['description'])
    # print("Image:", post['urlToImage'])
    # print("Published:", post['publishedAt'])
    # print("Source:", post['source']['name'])
    # print("Content:", post['content'])
    # print('URL: ', post['url'])
    # break

# Printing the data inserted
# cursor = collection.find()
# print(cursor)
# for record in cursor:
#     print(record)
