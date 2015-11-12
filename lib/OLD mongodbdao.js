var mongoClient = require('mongodb').MongoClient;
var assert = require('assert');
	
var mongodbdao = {
	
	_url: 'mongodb://localhost:27017/vatstats',
	_collection_onlineclients: 'onlineclients',
	
	getOnlineClients: function(callback) {
		mongoClient.connect(mongodbdao._url, function(err, db) {
			if(err != null) {
				callback(err, null);
			}
			
			db.collection(mongodbdao._collection_onlineclients).find().toArray(function(err, docs) {
				db.close();
				callback(err, docs);
			});
		});
	},
	
	// For unittest usage
	deleteAllOnlineClients: function(callback) {
		mongoClient.connect(mongodbdao._url, function(err, db) {
			if(err != null) {
				callback(err, null);
			}
			
			db.collection(mongodbdao._collection_onlineclients).drop(function(err, result) {
				db.close();
				callback(err, result);
			});
		});
	}
};

exports.mongodbdao = mongodbdao;