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

auth_handler = tweepy.OAuthHandler(consumer_key = consumer_key, consumer_secret = consumer_secret)
auth_handler.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth_handler)

client = tweepy.Client(bearer_token=bearer_token, consumer_key = consumer_key, consumer_secret=consumer_secret, access_token=access_token, access_token_secret=access_token_secret)

query = 'from:Cointelegraph'

tweets = client.search_recent_tweets(query=query, media_fields = "preview_image_url",tweet_fields=['context_annotations', 'created_at'], max_results=10)

for tweet in tweets.data:
    print(tweet.data)



