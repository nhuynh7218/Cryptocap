import os, pymongo, json
from dotenv import load_dotenv
from pymongo import MongoClient
from pycoingecko import CoinGeckoAPI

# import urllib library
from urllib.request import urlopen

# load dotenv lib
load_dotenv()

# MongoDB config
MongoDB_USER = os.getenv('MongoDB_USER')
MongoDB_PASS = os.getenv('MongoDB_PASS')
MongoDB_CLUSTER = os.getenv('MongoDB_CLUSTER')
MongoDB_NAME = os.getenv('MongoDB_NAME')

# CoinGecko API Init
cg = CoinGeckoAPI()

# Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
client = MongoClient('mongodb+srv://' + MongoDB_USER + ':' + MongoDB_PASS + '@' + MongoDB_CLUSTER + '/frontend?retryWrites=true&w=majority')

# call mongodb func
db = client[MongoDB_NAME]

# select collection
collection = db['coins']

# coins = cg.get_coins_list()
# markets = cg.get_coins_markets()

# store the URL in url as parameter for urlopen
cg_coins_url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100"
  
# store the response of URL
response = urlopen(cg_coins_url)
  
# storing the JSON response from url in data
cg_data_json = json.loads(response.read())

# Inserting the loaded data in the Collection
# if JSON contains data more than one entry
# insert_many is used else inser_one is used
if isinstance(cg_data_json, list):
    collection.insert_many(cg_data_json) 
    print("\n Imported top 100 coins \n")
else:
    collection.insert_one(cg_data_json)