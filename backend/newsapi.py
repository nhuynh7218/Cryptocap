from newsapi import NewsApiClient

# importing pymongo
import pymongo
import urllib.parse
from pymongo import MongoClient

# Init
# newsapi = NewsApiClient(api_key='')
# username = urllib.parse.quote_plus('')
# password = urllib.parse.quote_plus('')


# establing connection
try:
  cluster = MongoClient('mongodb://%s:%s@cluster0.go9eq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority' % (username, password))
  print("Connected successfully!")
except:
  print("Could not connect to MongoDB")

# connecting or switching to the database
db = cluster["frontend"]
collection = db["news"]


document = {
    "title": 'TITLE',
    "description": "description",
    "image": "urlToImage"
    # "source": post['source']['name'],
    # "content": post['content'],
    # "url": post['url'],
    # "published": post['publishedAt']
  }

collection.insert_one(document)
exit()

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
  
  print(document)
<<<<<<< Updated upstream
=======
  # print("\n\n---------\n\n")
>>>>>>> Stashed changes
  # collection.insert_one(document)
  break
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
