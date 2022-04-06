import os, random
from flask import Flask
from flask_cors import CORS
# from flask import jsonify
from flask import request
from flask_pymongo import PyMongo
from dotenv import load_dotenv
from bson.objectid import ObjectId

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

# collection_news.aggregate([
#     {
#         '$addFields': {
#             'upvote': 0, 
#             'downvote': 0
#         }
#     }
# ])

# print(result)

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
@app.route('/news', methods = ['DELETE'])
def deleteAllNews():
    collection_news.delete_many({})
    return{
        "msg": "Deleted Successfully!"
    }


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

if __name__ == '__main__':
    app.run(debug=True)