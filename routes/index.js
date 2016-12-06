var express = require('express');
var router = express.Router();

var user = require('../services/account/user');

router.get('/home', function(req, res, next) {
    res.send('Hi ' + req.user.firstName + ' ' + req.user.lastName +
        '&lt;' + req.user.email + '&gt;');
});

router.delete('/user', user.remove);
router.put('/user', user.update);
router.get('/user', user.find);

module.exports = router;
