import os
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

# RESTAPI INDEX PAGE
@app.get('/')
def index():
    return "Hello CryptoCap Fellows!"

''' -----------  /news  ----------- '''
# GET ALL NEWS ARTICLES
@app.route('/news', methods = ['GET'])
def getAllNews():
    news = collection_news.find({})
    news_list = []
    for n in news:
        n['_id'] = str(n['_id'])
        news_list.append(n)
    return {
        "msg"   : "Success",
        "result" : news_list
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

if __name__ == '__main__':
    app.run(debug=True)