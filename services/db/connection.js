var mongodb = require('mongodb');
var Promise = require('bluebird');

var config = require('../../globals');

var MongoClient = mongodb.MongoClient;
var mongoUrl = 'mongodb://' + config.dbIp + '/' + config.dbName + '?w=1';

var db = null;
var options = {
    server: {
        poolSize: config.dbPoolSize
    }
};

function initPool(callback) {
    MongoClient.connect(mongoUrl, options, function(err, dbObj) {
        if (err) {
            callback(err, null);
        } else if (callback && typeof(callback) == 'function') {
            db = dbObj;
            callback(null, dbObj);
        }
    });
}

var MongoPool = {
    initPool: initPool,

    getInstance: function(callback) {
        if (!db) {
            initPool(callback);
        } else {
            if (callback && typeof(callback) == 'function') {
                callback(null, db);
            }
        }
    }
}

module.exports = MongoPool;
