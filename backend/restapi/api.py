import os, random
from flask import Flask, request, abort
from flask_cors import CORS
# from flask import jsonify
from flask_pymongo import PyMongo
from dotenv import load_dotenv
from bson.objectid import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash

# load dotenv lib
load_dotenv()

# MongoDB config
MongoDB_USER = os.getenv('MongoDB_USER')
MongoDB_PASS = os.getenv('MongoDB_PASS')
MongoDB_CLUSTER = os.getenv('MongoDB_CLUSTER')
MongoDB_NAME = os.getenv('MongoDB_NAME')

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

# Create a connection using flask_pymongo.
app.config['MONGO_DBNAME'] = MongoDB_NAME
app.config['MONGO_URI'] = 'mongodb+srv://' + MongoDB_USER + ':' + MongoDB_PASS + '@' + MongoDB_CLUSTER + '/frontend?retryWrites=true&w=majority'
mongo = PyMongo(app)

# news collection
collection_news = mongo.db.news
# coins collection
collection_coins = mongo.db.coins
# users collection
collection_users = mongo.db.users

# RESTAPI INDEX PAGE
@app.get('/')
def index():
    return "Hello CryptoCap Fellows!"

''' -----------  /news  ----------- '''
'''
    Methods related to the News endpoint is written here.
    GET:
        Input: {'page':Int, 'limit':Int}
        Output: {'msg':String, 'total_number':Int, 'page':Int, 'showing':Int, news:List}
````
TODO:
    - SORT BY VOTES
        -news.sort(votes: asec).skip(x).limit(x)
'''

# GET ALL NEWS ARTICLES
@app.route('/news', methods = ['GET'])
def getAllNews():
    
    # default page and limit values
    page_limit = 10
    page = 1
    # sortby = "published"
    order = -1 # desc -1 / asc 1
    
    # count total news articles
    news_count = collection_news.count_documents({})

    # check if sort arg exists
    # if(request.args.get('sort')):
    #     sortby = int(request.args.get('sort'))
    
    # check if order arg exists
    if(request.args.get('order')):
        order = int(request.args.get('order'))

    # check if page limit arg exists
    if(request.args.get('limit')):
        page_limit = int(request.args.get('limit'))

    # check if page arg exists
    if(request.args.get('page')):
        page = int(request.args.get('page'))
        
    news = collection_news.find().sort("published", order).skip(page_limit * (page - 1)).limit(page_limit)

    news_list = []
    for n in news:
        n['_id'] = str(n['_id'])
        n['totalvotes'] = n['upvote'] - n['downvote']
        news_list.append(n)
    return {
        "msg"   : "Success",
        "total_number" : news_count,
        "page" : page,
        "showing": page_limit,
        "news" : news_list
    }


# GET ALL NEWS ARTICLES
@app.route('/GetInitial', methods = ['GET'])
def GetInitial():
    
    # default page and limit values
    page_limit = 10
    page = 1
    order = -1 # desc -1 / asc 1
    
    # count total news articles
    news_count = collection_news.count_documents({})
    
    # check if order arg exists
    if(request.args.get('order')):
        order = int(request.args.get('order'))

    # check if page limit arg exists
    if(request.args.get('limit')):
        page_limit = int(request.args.get('limit'))

    # check if page arg exists
    if(request.args.get('page')):
        page = int(request.args.get('page'))
        
    news = collection_news.find().sort("published", order).skip(page_limit * (page - 1)).limit(page_limit)
    x = random.randint(1,10)
    news_list = []
    for n in news:
        n['_id'] = str(n['_id'])
        n['totalvotes'] = n['upvote'] - n['downvote']
        news_list.append(n)
    return {
        "msg"   : "Success",
        "total_number" : news_count,
        "page" : page,
        "showing": page_limit,
        "news" : news_list,
        "randomarticle": news_list[x]
    }

# INSERT ONE NEWS ARTICLE 
@app.route('/news', methods = ['POST'])
def addANewNews():
    news_data = request.get_json()
    collection_news.insert_one(news_data)
    return {
        "msg" : "Successfully added!"
    }

# DELETE ALL NEWS ARTICLES
# @app.route('/news', methods = ['DELETE'])
# def deleteAllNews():
#     collection_news.delete_many({})
#     return{
#         "msg": "Deleted Successfully!"
#     }


''' -----------  /news/:newsid  ----------- '''
# GET NEWS ARTICLE BY ID
@app.route('/news/<newsid>', methods = ['GET'])
def getNews(newsid:int):
    news = collection_news.find_one({"_id" : ObjectId(newsid)})
    if (news is None):
        return {'msg' : "No news with the given id exists"}
    news['_id'] = str(news['_id'])
    news['totalVotes'] = news['upvote'] - news['downvote']
    return {
        "msg"  : "Success",
        "result" : news
    }

# DELETE NEWS ARTICLE BY ID
@app.route('/news/<newsid>', methods = ['DELETE'])
def deleteNews(newsid:int):
    collection_news.delete_one({"_id": ObjectId(newsid)})
    return {
        "msg" : "Deleted Successfully!"
    }

# UPDATE NEWS ARTICLE BY ID
@app.route('/news/<newsid>', methods = [ 'PATCH', 'PUT' ])
def updateNews(newsid:int):
    modified_count = collection_news.update_one(
        {"_id": ObjectId(newsid)},
        { "$set": request.get_json()}
    ).modified_count

    if (modified_count == 0):
        return {"msg" : "No news exists with the given id"}
    return {"msg" : "Updated Successfully"}


# UPDATE UPVOTE NEWS ARTICLE BY ID
@app.route('/news/upvote/<newsid>', methods=['GET', 'POST'])
def updateUpvoteNews(newsid:int):
    modified_count = collection_news.update_one(
        {"_id": ObjectId(newsid)},
        {
            "$inc": { "upvote": 1 }
        }
    ).modified_count

    if (modified_count == 0):
        return {"msg" : "The article does not exists with the given id"}
    return {"msg" : "Upvote Updated Successfully"}

# UPDATE DOWNVOTE NEWS ARTICLE BY ID
@app.route('/news/downvote/<newsid>', methods=['GET', 'POST'])
def updateDownvoteNews(newsid:int):
    modified_count = collection_news.update_one(
        {"_id": ObjectId(newsid)},
        {
            "$inc": { "downvote": 1 }
        }
    ).modified_count

    if (modified_count == 0):
        return {"msg" : "The article does not exists with the given id"}
    return {"msg" : "Downvote Updated Successfully"}


# GET ALL CRYPTOCURRENCIES
@app.route('/coins', methods = ['GET'])
def getAllCoins():
    
    # default page and limit values
    page_limit = 10
    page = 1
    sortby = "market_cap"
    order = -1 # desc -1 / asc 1
    
    # count total news articles
    coins_count = collection_coins.count_documents({})

    # check if sort arg exists
    if(request.args.get('sort')):
        sortby = int(request.args.get('sort'))
    
    # check if order arg exists
    if(request.args.get('order')):
        order = int(request.args.get('order'))

    # check if page limit arg exists
    if(request.args.get('limit')):
        page_limit = int(request.args.get('limit'))

    # check if page arg exists
    if(request.args.get('page')):
        page = int(request.args.get('page'))
        
    # sort by market cap default
    coins = collection_coins.find().sort(sortby, order).skip(page_limit * (page - 1)).limit(page_limit)

    coins_list = []
    for n in coins:
        n['_id'] = str(n['_id'])
        remove_key = n.pop("prices", None)
        coins_list.append(n)
    return {
        "msg"   : "Success",
        "total_number" : coins_count,
        "page" : page,
        "showing": page_limit,
        "coins" : coins_list
    }


''' -----------  /coins/:coinid  ----------- '''
# GET CRYPTO BY ID
@app.route('/coins/<coinid>', methods = ['GET'])
def getCoin(coinid:int):

    sortby = "prices.timpestamp"
    order = -1 # desc -1 / asc 1

    # check if order arg exists
    if(request.args.get('order')):
        order = int(request.args.get('order'))

    coin = collection_coins.find_one({"id" : coinid})
    # check if coinid exists 
    if (coin is None):
        return {'msg' : "Cryptocurrency " + coinid + " does not exist. Please double-check id."}
    
    coin['_id'] = str(coin['_id'])
    return {
        "msg"  : "Success",
        "result" : coin
    }

''' -----------  /coins/:coinid  ----------- '''
# GET CRYPTO PRICE HISTORY BY ID
@app.route('/coins/<coinid>/prices', methods = ['GET'])
def getCoinPrices(coinid:int):

    # check if order arg exists
    if(request.args.get('order')):
        order = int(request.args.get('order'))

    coin = collection_coins.find_one({"id" : coinid})
    # check if coinid exists 
    if (coin is None):
        return {'msg' : "Cryptocurrency " + coinid + " does not exist. Please double-check id."}
    
    return {
        "msg"  : "Success",
        "prices" : coin['prices']
    }

''' -----------  /user/:userid  ----------- '''
# INSERT USER 
@app.route('/user', methods = ['POST'])
def addUser():
    email = request.json.get('email')
    password = request.json.get('password')
    if email is None or password is None:
        abort(400)    # missing arguments

    user_exists = collection_users.find_one({"email" : email})
    if (user_exists is not None):
        return { "msg" : "Email already exists."}
    
    user_data = request.get_json()
    user_data['password'] = generate_password_hash(password)
    collection_users.insert_one(user_data)
    return {
        "msg" : "User successfully added!"
    }

''' -----------  /user/:userid  ----------- '''
# GET USER BY ID
@app.route('/user/<userid>', methods = ['GET'])
def getUser(userid:int):
    user = collection_users.find_one({"_id" : ObjectId(userid)})
    if (user is None):
        return {'msg' : "No user found with the given id."}
    user['_id'] = str(user['_id'])
    remove_key = user.pop("password", None)
    return {
        "msg"  : "Success",
        "result" : user
    }

# DELETE USER BY ID
@app.route('/user/<userid>', methods = ['DELETE'])
def deleteUser(userid:int):
    collection_users.delete_one({"_id": ObjectId(userid)})
    return {
        "msg" : "User deleted successfully!"
    }


if __name__ == '__main__':
    app.run(debug=True)