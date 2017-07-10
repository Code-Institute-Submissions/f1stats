from flask import Flask
from flask import render_template
from pymongo import MongoClient
import json
import os


app = Flask(__name__)
# CLARIFY THESE
MONGO_URI = os.getenv('MONGODB_URI', 'mongodb://localhost:27017')
DBS_NAME = os.getenv('MONGO_DB_NAME', 'f1db')
COLLECTION_NAME = 'f1results'


@app.route('/')
def index():
    return render_template("index.html")
# ROUTE OF DB FILE?


@app.route("/f1db")
def f1results():
    """
    A Flask view to serve the project data from
    MongoDB in JSON format.
    """

    FIELDS = {'_id': False, }

    with MongoClient(MONGO_URI) as conn:
        collection = conn[DBS_NAME][COLLECTION_NAME]
        results = collection.find(projection=FIELDS)
        return json.dumps(list(results))


if __name__ == '__main__':
    app.run(debug=True)
