from django.db import models

import newsapi
import pymongo
import urllib.parse
from pymongo import MongoClient
from newsapi import NewsApiClient

# Init
newsapi = NewsApiClient(api_key='03c5e649e30745138c3c93de33b8ad56')
username = urllib.parse.quote_plus('cryptocap')
password = urllib.parse.quote_plus('abc123abc')

def get_database():
  # establing connection
  try:
    # Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
    client = MongoClient('mongodb+srv://cryptocap:abc123abc@cluster0.go9eq.mongodb.net/frontend?retryWrites=true&w=majority')
    print("Connected successfully!")
  except:
    print("Could not connect to MongoDB")

  db = client['frontend']
  return db

if __name__ == "__main__":    
  
  # call mongodb func
  db = get_database()
  # select collection
  collection = db['news']
  
  # /v2/get_everything
  sources = newsapi.get_everything(q='crypto', page=1, page_size=5)
  posts = sources['articles']

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
    
    print("\n\n---------\n\n")
    
    collection.insert_one(document)
    print("Title:", post['title'].lower())
    print("Description:", post['description'])
    print("Image:", post['urlToImage'])
    print("Published:", post['publishedAt'])
    print("Source:", post['source']['name'])
    print("Content:", post['content'])
    print('URL: ', post['url'])
    break


  # Printing the data inserted
  # cursor = collection.find()
  # print(cursor)
  # for record in cursor:
  #     print(record)

