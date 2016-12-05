var express = require('express');
var router = express.Router();

var user = require('../services/account/user');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/signup', function(req, res, next) {
    res.render('signup');
});

router.post('/user', user.create);
router.delete('/user', user.remove);
router.put('/user', user.update);
router.get('/user', user.find);

module.exports = router;
