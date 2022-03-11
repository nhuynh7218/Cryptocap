import tweepy
from tweepy import OAuthHandler
import pandas as pd
import json

#authenticate API
consumer_key = 'UCceBXpGlkXluwQKV5nCkfG5m'
consumer_secret = 'jQex6ZTHcwmBJoDGAhqQdbKc9Y83VrdHTJC4CIiUZPoDCZdRxz'
bearer_token = 'AAAAAAAAAAAAAAAAAAAAAP4PZwEAAAAAYpgGoPTtv8oV%2FywmpqHs4nd5a6c%3D8PpYEUyomhzrokBGoDv8dJiOvR13LTYalOLIb0WHLriA1SvaaT'

access_token = '1498744927030857730-w1St05R0zUad9q99CH6pbjbJmqF1E5'
access_token_secret ='NtFxJEKNlZTCmCoMwhQSxiTRVaAghn0IamuRhhv1Xb6Wz'


client = tweepy.Client(bearer_token=bearer_token, consumer_key = consumer_key, consumer_secret=consumer_secret, access_token=access_token, access_token_secret=access_token_secret)

#queries = ['from:Cointelegraph', 'from:Crypto', 'from:CryptoBoomNews', 'from:BitcoinMagazine']
#tweets = client.search_recent_tweets(query=query, media_fields = "preview_image_url",tweet_fields=['context_annotations', 'created_at'], max_results=10)
userID = "Crypto"
response = client.search_recent_tweets(("from:"+userID), tweet_fields = ['created_at','author_id','attachments'])
# The method returns a Response object, a named tuple with data, includes,
# errors, and meta fields
print(response.meta)

# In this case, the data field of the Response returned is a list of Tweet
# objects
tweets = response.data

# Each Tweet object has default id and text fields
for tweet in tweets:
    document = {
        "tweetID" : tweet.id, 
        "text" : tweet.text,
        "author ID": tweet.author_id,
        "created at": tweet.created_at,
        "URL": "https://twitter.com/"+userID+"/status/"+(str(tweet.id))
    }
    print(document)
    print("\n\n---------\n\n")
exit()
for tweet in tweets:
    print("tweetid: ", tweet.id)
    print("text: ", tweet.text)
    print("author ID: ", tweet.author_id)
    print("attatchments: ", tweet.attachments)
    print("created at: ", tweet.created_at)
    print("URL:" "https://twitter.com/"+userID+"/status/"+(str(tweet.id)))
    print("______________")


    

exit()

