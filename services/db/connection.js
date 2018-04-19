var mongodb = require('mongodb');
var Promise = require('bluebird');

var config = require('../../globals');

var MongoClient = mongodb.MongoClient;
var mongoUrl = 'mongodb://' + config.dbIp + '/' + config.dbName + '?w=1';

var db = null;
var options = {
    poolSize: config.dbPoolSize
};

function initPool(callback) {
    MongoClient.connect(mongoUrl, options, function (err, client) {
        if (err) {
            callback(err, null);
        } else if (callback && typeof (callback) == 'function') {
            dbObj = client.db(config.dbName);
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
