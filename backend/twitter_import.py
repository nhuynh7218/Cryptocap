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

# You can specify expansions to retrieve additional objects that relate to the
# returned results
response = client.search_recent_tweets(
    "from:Crypto", expansions=["attachments.media_keys", "author_id"]
)
tweets = response.data

# You can then access those objects in the includes Response field
includes = response.includes
users = includes["users"]

# The IDs that represent the expanded objects are included directly in the
# returned data objects
# for tweet in tweets:
#     print(tweet.author_id)

# An efficient way of matching expanded objects to each data object is to
# create a dictionary of each type of expanded object, with IDs as keys
users = {user["id"]: user for user in users}
for tweet in tweets:
    print(tweet.id)
    print(tweet.attachments, users[tweet.author_id].username)
    break


exit()







#queries = ['from:Cointelegraph', 'from:Crypto', 'from:CryptoBoomNews', 'from:BitcoinMagazine']
#tweets = client.search_recent_tweets(query=query, media_fields = "preview_image_url",tweet_fields=['context_annotations', 'created_at'], max_results=10)
userID = "Crypto"
response = client.search_recent_tweets(("from:"+userID), tweet_fields = ['created_at','author_id','attachments'])
# The method returns a Response object, a named tuple with data, includes,
# errors, and meta fields
# print(response.meta)

# In this case, the data field of the Response returned is a list of Tweet
# objects
tweets = response.data

# Each Tweet object has default id and text fields
for tweet in tweets:
    print(tweet.author_id.username)
    published_at = tweet.created_at
    # document = {
    #     "title" : "TITLE", 
    #     "image": 'img',
    #     "source": tweet.author_id,
    #     "content" : tweet.text,
    #     "url": "https://twitter.com/"+userID+"/status/"+(str(tweet.id)),
    #     "published": published_at
    # }

    # print(document)
    # break
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

{'tweetID': 1503451501292888068, 
'text': 'RT @Yueqi_Yang: Exclusive: Crypto analytics firm @gauntletnetwork, founded by a former D.E. Shaw Research quant, hit $1 billion valuation a…', 
'author ID': 928759224599040001, 
'created at': datetime.datetime(2022, 3, 14, 19, 22, 25, tzinfo=datetime.timezone.utc), 
'URL': 'https://twitter.com/Crypto/status/1503451501292888068'}
    

exit()

