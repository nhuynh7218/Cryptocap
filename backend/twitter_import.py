import os, tweepy, pymongo
from tweepy import OAuthHandler
import pandas as pd
from pymongo import MongoClient
from dotenv import load_dotenv

# load dotenv lib
load_dotenv()

# authenticate API
consumer_key = os.getenv('t_consumer_key')
consumer_secret = os.getenv('t_consumer_secret')
bearer_token = os.getenv('t_bearer_token')
access_token = os.getenv('t_access_token')
access_token_secret = os.getenv('t_saccess_token_secret')

MongoDB_USER = os.getenv('MongoDB_USER')
MongoDB_PASS = os.getenv('MongoDB_PASS')
MongoDB_CLUSTER = os.getenv('MongoDB_CLUSTER')
clientdb = MongoClient('mongodb+srv://' + MongoDB_USER + ':' + MongoDB_PASS + '@' + MongoDB_CLUSTER + '/frontend?retryWrites=true&w=majority')

db = clientdb['frontend']
collection = db['news']

client = tweepy.Client(bearer_token=bearer_token, consumer_key = consumer_key, consumer_secret=consumer_secret, access_token=access_token, access_token_secret=access_token_secret)

#List of Twitter accounts to scrape from
userID = ['Cointelegraph', 'Crypto', 'CryptoBoomNews', 'BitcoinMagazine']

x=1
#iterates through each twitter account and get recent tweets, defaults to 10 tweets, can use max = xxx, up to 100
for user in userID:
    response = client.search_recent_tweets((("from:"+user+" -is:retweet")), tweet_fields = ['created_at','author_id','attachments'])
    # The method returns a Response object, a named tuple with data, includes,
    # errors, and meta fields
    # print(response.meta)

    # In this case, the data field of the Response returned is a list of Tweet
    # objects
    tweets = response.data
        
    # Each Tweet object has default id and text fields
    for tweet in tweets:
        document = {
            "title": tweet.text[0][:50],
            "description": tweet.text[:260] + '...',
            "image" : tweet.attachments,
            "source" : user,
            "content" : tweet.text,
            "url": "https://twitter.com/"+user+"/status/"+(str(tweet.id)),
            "published": tweet.created_at,
        }
        
        exists = collection.count_documents({ "url": document['url'] }) > 0
        if(exists == False):
            collection.insert_one(document)
            print("\n Imported ",x, " - ", document['url'], "\n")
            x+=1
        else:
            print("\n News already imported. Skipped.")

