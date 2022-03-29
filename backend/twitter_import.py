import os, tweepy, pymongo
from tweepy import OAuthHandler
import pandas as pd
from pymongo import MongoClient
from dotenv import load_dotenv

# load dotenv lib
load_dotenv()

#authenticate API
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
userID = ['Cointelegraph','Crypto', 'CryptoBoomNews', 'BitcoinMagazine']
userPicUrl = ['https://pbs.twimg.com/profile_images/1270073276740534274/APmUBHaI_400x400.jpg','https://pbs.twimg.com/profile_images/1483830321632227338/r6Owp8dL_400x400.jpg','https://pbs.twimg.com/profile_images/1364184030103670785/0D_DmDkX_400x400.jpg','https://pbs.twimg.com/profile_images/1444022922377576453/AzvXYXGr_400x400.jpg']
x=1
picurlCount = 0
#iterates through each twitter account and get recent tweets, defaults to 10 tweets, can use max = xxx, up to 100
for user in userID:
    response = client.search_recent_tweets((("from:"+user+" -is:retweet")), tweet_fields = ['created_at','entities', 'attachments'], expansions='attachments.media_keys', media_fields = ['media_key','preview_image_url'])
    # The method returns a Response object, a named tuple with data, includes,
    # errors, and meta fields
    print(response.meta)

    # In this case, the data field of the Response returned is a list of Tweet
    # objects
    tweets = response.data
        
    # Each Tweet object has default id and text fields
    for tweet in tweets:
        title = tweet.text.split('\n') 

        document = {
            "title": title[0][:80],
            "description": tweet.text[:260] + '...',
            "image" : userPicUrl[picurlCount],
            "source" : user,
            "content" : tweet.text,
            "url": "https://twitter.com/"+user+"/status/"+(str(tweet.id)),
            "published": tweet.created_at,
        }
        while picurlCount<3:
            picurlCount+=1
        print(document)
        # exists = collection.count_documents({ "url": document['url'] }) > 0
        # if(exists == False):
        #    collection.insert_one(document)
        #    print("\n Imported ",x, " - ", document['url'], "\n")
        #    x+=1
        # else:
        #    print("\n News already imported. Skipped.")

