var Promise = require('bluebird');
var using = Promise.using;
var connection = require('./connection');


var insert = function(collectionName, data) {
    return new Promise(function(resolve, reject) {
        connection.getInstance(function(error, db) {
            if (error) {
                reject(error);
            } else {
                db.collection(collectionName).insertOne(data, function(error, result) {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            }
        });
    });
}

var read = function(collectionName, criteria) {
    return new Promise(function(resolve, reject) {
        connection.getInstance(function(error, db) {
            if (error) {
                reject(error);
            } else {
                db.collection(collectionName).find(criteria).toArray(function(error, result) {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            }
        });
    });
}

var update = function(collectionName, criteria, updates) {
    return new Promise(function(resolve, reject) {
        connection.getInstance(function(error, db) {
            if (error) {
                reject(error);
            } else {
                db.collection(collectionName).updateMany(criteria, {
                    $set: updates
                }, function(error, result) {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            }
        });
    });
}

var remove = function(collectionName, criteria) {
    return new Promise(function(resolve, reject) {
        connection.getInstance(function(error, db) {
            if (error) {
                reject(error);
            } else {
                db.collection(collectionName).deleteMany(criteria, function(error, result) {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            }
        });
    });
}

var logActivity = function(data) {
    insert('activity', [data])
        .then(function(data) {})
        .error(function(err) {
            console.log('Error while logging activity');
        });
}

exports.insert = insert;
exports.update = update;
exports.read = read;
exports.remove = remove;
exports.logActivity = logActivity;
