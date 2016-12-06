var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var Strategy = require('passport-http').BasicStrategy;
var bcrypt = require('bcrypt-nodejs');
var bodyParser = require('body-parser');

var user = require('./services/account/user');
var index = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Public APIs - start
app.get('/', function(req, res, next) {
    res.render('index');
});
app.get('/signup', function(req, res, next) {
    res.render('signup');
});
app.post('/user', user.create);
// Public APIs - end

// Authentication strategy - start
passport.use(new Strategy(
    function(username, password, cb) {
        user.findOne(username).then(function(user) {
            if (!user) {
                return cb(null, false);
            }
            var valid = bcrypt.compareSync(password, user.password);
            if (valid) {
                delete user.password;
                cb(null, user);
            } else {
                cb(null, false);
            }
        }).error(function(err) {
            cb(err);
        });
    }));
// Authentication strategy - end

app.use('/', passport.authenticate('basic', {
    session: false
}), index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            msg: err.message,
            err: err
        });
    });
}

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        msg: err.message,
        err: {}
    });
});

module.exports = app;
