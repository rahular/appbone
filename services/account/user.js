var Promise = require('bluebird');
var bcrypt = require('bcrypt-nodejs');
var entity = require('../db/entity');

function create(firstName, lastName, email, password) {
    return new Promise(function(resolve, reject) {
        entity.read('users', {
            email: email
        }).then(function(rows) {
            if (rows.length > 0) {
                reject(new Error('User with email already exists'));
            } else {
                entity.insert('users', {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: bcrypt.hashSync(password)
                }).then(function(data) {
                    resolve(data);
                }).catch(function(err) {
                    reject(new Error('Error writing to DB'));
                });
            }
        }).catch(function(err) {
            reject(new Error('Error reading from DB'));
        });
    });
}

function find(email) {
    return new Promise(function(resolve, reject) {
        entity.read('users', {
            email: email
        }).then(function(rows) {
            resolve(rows[0]);
        }).catch(function(err) {
            reject(new Error('Error reading from DB'))
        });
    });
}

function update(firstName, lastName, email, password) {
    return new Promise(function(resolve, reject) {
        entity.update('users', {
            email: email
        }, {
            firstName: firstName,
            lastName: lastName,
            password: bcrypt.hashSync(password)
        }).then(function(data) {
            resolve(data);
        }).catch(function(err) {
            reject(new Error('Error writing to DB'));
        });
    });
}

function remove(email) {
    return new Promise(function(resolve, reject) {
        entity.remove('users', {
            email: email
        }).then(function(data) {
            resolve(data);
        }).catch(function(err) {
            reject(new Error('Error removing from the DB'));
        });
    });
}

var user = {
    create: function(req, res, next) {
        var body = req.body;
        if (!body) {
            next(new Error('Invalid request'));
        } else if (!body.firstName || body.firstName === '') {
            next(new Error('Missing requires params: firstName'));
        } else if (!body.lastName || body.lastName === '') {
            next(new Error('Missing requires params: lastName'));
        } else if (!body.email || body.email === '') {
            next(new Error('Missing requires params: email'));
        } else if (!body.password || body.password === '') {
            next(new Error('Missing requires params: password'));
        } else {
            create(body.firstName, body.lastName, body.email, body.password).then(function(data) {
                res.json(data);
            }).catch(function(err) {
                console.log(err);
                next(err);
            });
        }
    },
    find: function(req, res, next) {
        var body = req.query;
        if (!body) {
            next(new Error('Invalid request'));
        } else if (!body.email || body.email === '') {
            next(new Error('Missing requires params: email'));
        } else {
            find(body.email, body.password).then(function(data) {
                res.json(data);
            }).catch(function(err) {
                console.log(err);
                next(err);
            });
        }
    },
    update: function(req, res, next) {
        var body = req.body;
        if (!body) {
            next(new Error('Invalid request'));
        } else if (!body.firstName || body.firstName === '') {
            next(new Error('Missing requires params: firstName'));
        } else if (!body.lastName || body.lastName === '') {
            next(new Error('Missing requires params: lastName'));
        } else if (!body.email || body.email === '') {
            next(new Error('Missing requires params: email'));
        } else if (!body.password || body.password === '') {
            next(new Error('Missing requires params: password'));
        } else {
            update(body.firstName, body.lastName, body.email, body.password).then(function(data) {
                res.json(data);
            }).catch(function(err) {
                console.log(err);
                next(err);
            });
        }
    },
    remove: function(req, res, next) {
        var body = req.body;
        if (!body) {
            next(new Error('Invalid request'));
        } else if (!body.email || body.email === '') {
            next(new Error('Missing requires params: email'));
        } else {
            remove(body.email).then(function(data) {
                res.json(data);
            }).catch(function(err) {
                console.log(err);
                next(err);
            });
        }
    }
};

module.exports = user;
