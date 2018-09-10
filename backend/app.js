var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


mongoose.Promise = require('bluebird');     // use Promise library instead of use default promise of Mongoose
mongoose
    .connect('mongodb://localhost/pawnshop', { promiseLibrary: require('bluebird') })
    .then(() => console.log('connection successful'))
    .catch((err) => console.log('connection error', err));


var app = express();
var orderRoute = require('./routes/order');
var customerRoute = require('./routes/customer');
var userRoute = require('./routes/user');
var crawlRoute = require('./routes/crawl');

/** Define CORS middleware */
var allowCrossDomain = function (req, res, next) {
    console.log('access cross domain configure.');

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Content-Type', 'application/json');

    next();
}

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 'extended': 'false' }));
app.use(allowCrossDomain);
app.use('/Order', orderRoute);
app.use('/Customer', customerRoute);
app.use('/User', userRoute);
app.use('/Crawl', crawlRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    res.status(404).send('Route Not Found');
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
