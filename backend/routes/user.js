var express = require('express');
var router = express.Router();
var UserSchema = require('../models/user');

function handleError(res, err) {
    res.status = 500;
    res.send(err);
}

function handleWarning(res, msg) {

    res.status = 404;
    res.json({ 'info': msg });
}

function handleSuccess(res, result) {
    res.status = 200;
    res.json(result)
}

router.get('/', function (req, res, next) {
    res.send('User -> gotcha');
});

router.get('/:id', (req, res, next) => {
    UserSchema.findById(req.params.id, (err, userRecord) => {
        if (err)
            return handleError(res, err);
        else if (!userRecord)
            return handleWarning(res, 'User not found');

        return handleSuccess(res, userRecord);
    });
});

router.post('/create', (req, res, next) => {
    var userObj = req.body;
    UserSchema.create(userObj, function (err, userRecord) {
        if (err)
            return handleError(res, err);

        return handleSuccess(res, userRecord);
    });
});


router.get('/find/:value/:criteria', (req, res, next) => {
    var searchValue = req.params.value;
    var criteriaValue = req.params.criteria;
    var criteria;

    switch (criteriaValue) {
        case 'Name':
            criteria = { 'Fullname': { $regex: '.*' + searchValue + '.*', $options: 'i' } }
            break;
        case 'Identify':
            criteria = { 'Identify': { $regex: '.*' + searchValue + '.*', $options: 'i' } }
            break;
        case 'PhoneNumber':
            criteria = { 'PhoneNumber': { $regex: '.*' + searchValue + '.*', $options: 'i' } }
            break;
        case 'Email':
            criteria = { 'Email': { $regex: '.*' + searchValue + '.*', $options: 'i' } }
            break;
        default:
            return handleWarning(res, 'Invalid search option.');
    }

    var query = UserSchema.find(criteria);

    query.exec((err, result) => {
        if (err)
            return handleError(res, err);

        return handleSuccess(res, result);
    });
})

module.exports = router;