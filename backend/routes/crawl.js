var express = require('express');
var router = express.Router();
var http = require('http');
var request = require('request');

function crawlContent(url) {

    request({
        'url': url,
        'proxy': 'http://10.9.0.49:3128'
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        }
        else{
            console.log('error >>>>' , response.body);
        }
    })

}

router.get('/', function (req, res, next) {
    var content = crawlContent('http://kenh14.vn');
    res.json({ data: content });
});

module.exports = router; 3000