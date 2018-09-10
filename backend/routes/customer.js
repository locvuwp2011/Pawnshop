var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.send('Customer -> gotcha');
})

module.exports = router;