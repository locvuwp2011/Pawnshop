var express = require('express');
var router = express.Router();
var OrderSchema = require('../models/order');
var moment = require('moment');
var dateFormat = 'DD/MM/YYYY';

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

function addAudit(order, type, content) {
    order.Audit.push({ 'Type': type, 'Content': content });
    order.save();
}

function donglai_handler(order, donglai) {
    donglai.FromDate = moment(donglai.FromDate, dateFormat);
    donglai.ToDate = moment(donglai.ToDate, dateFormat);
    donglai.NextDate = moment(donglai.NextDate, dateFormat);
    donglai.Amount = donglai.Amount;

    order.DongLai.push(donglai);

    order.Audit.push(
        {
            'Type': 'Info',
            'Content': `DongLai from ${donglai.FromDate.format(dateFormat)} to ${donglai.ToDate.format(dateFormat)} with amount ${donglai.Amount}`
        });

    order.save();

    return order;
}

function complete_handler(order, complete) {
    order.Completed = { 'OriginalAmount': complete.OriginalAmount, 'LaiAmount': complete.LaiAmount };
    order.DateCompleted = Date.now;
    order.Status = 'Completed';

    order.Audit.push({ 'Type': 'Info', 'Content': `Completed order` });
    order.save();

    return order;
}

function thanhly_handler(order, requestBody) {
    // order.Completed = { 'OriginalAmount': thanhly.OriginalAmount, 'ThanhLyAmount': thanhly.ThanhLyAmount };
    // order.DateCompleted = moment().toDate();
    // order.Status = 'ThanhLy';

    // order.Audit.push({ 'Type': 'Info', 'Content': `ThanhLy order` });
    var reason = requestBody.Reason;
    var amount = requestBody.Amount;
    var note = requestBody.Note;

    order.Completed = { Amount: amount, Note: note };
    
    if(reason === 'Liquidated'){
        order.Status = 'Liquidated'
    }else{
        order.Status = 'Closed'
    }

    order.DateCompleted = moment().toDate();

    order.Audit.push({ 'Type': 'Info', 'Content': `${reason} order` });

    order.save();

    return order;
}

// Get all orders in today
router.get('/', function (req, res, next) {
    var today = moment().startOf('day')
    var tomorrow = moment(today).endOf('day')

    var query = OrderSchema.find({ 'DateCreated': { $gte: today.toDate(), $lt: tomorrow.toDate() } });

    query.exec(function (err, orderResults) {
        if (err)
            return handleError(res, err);

        res.json(orderResults);
    });
})

// Get orders by date
router.get('/date/:date', function (req, res, next) {
    var startDate = moment(req.params.date, dateFormat).startOf('day');
    var endDate = moment(req.params.date, dateFormat).endOf('day')

    var query = OrderSchema.find({ 'DateCreated': { $gte: startDate.toDate(), $lt: endDate.toDate() } });

    query.exec(function (err, orderResults) {
        if (err)
            return handleError(res, err);

        res.json(orderResults);
    });
})

// GET order by OrderID
router.get('/search/:orderID', function (req, res, next) {
    var orderID = req.params.orderID;

    OrderSchema.findOne({ 'OrderID': orderID }, function (err, result) {
        if (err)
            return handleError(res, err);
        if (!result || result.length == 0)
            return handleWarning(res, 'order not found');

        handleSuccess(res, result);
    })
})

// GET order by id
router.get('/:id', function (req, res, next) {
    OrderSchema.findById(req.params.id, function (err, result) {
        if (err)
            return handleError(res, err);
        if (!result || result.length == 0)
            return handleWarning(res, 'order not found');

        handleSuccess(res, result);
    })
})

// POST Create new Order
router.post('/create', function (req, res, next) {
    var orderObj = req.body;

    OrderSchema.create(orderObj, function (err, orderRecord) {
        if (err)
            return res.send(err);

        addAudit(orderRecord, 'Info', 'Create order');

        res.json(orderRecord);
    });

});

// PUT Update Order
router.put('/:id', function (req, res, next) {
    var id = req.params.id;

    OrderSchema.findByIdAndUpdate(id, req.body, function (err, orderRecord) {
        if (err) {
            return handleError(res, err);
        }
        else if (!orderRecord || orderRecord.length == 0)
            return handleWarning(res, 'OrderID not found');

        addAudit(orderRecord, 'Info', 'Updated order info');

        handleSuccess(res, orderRecord);
    })
})

// POST DongLai
router.post('/donglai/:id', function (req, res, next) {
    var id = req.params.id;

    OrderSchema.findById(id, function (err, orderResult) {
        if (err)
            return handleError(res, err);
        else if (!orderResult)
            return handleWarning(res, 'OrderID not found');

        res.json(donglai_handler(orderResult, req.body));
    });
})

// POST Completed
router.post('/completed/:id', function (req, res, next) {
    var id = req.params.id;

    OrderSchema.findById(id, function (err, orderResult) {
        if (err)
            return handleError(res, err);
        else if (!orderResult)
            return handleWarning(res, 'OrderID not found');

        res.json(complete_handler(orderResult, req.body));
    });
})

// POST ThanhLy
router.post('/ThanhLy/:id', function (req, res, next) {
    var id = req.params.id;

    OrderSchema.findById(id, function (err, orderResult) {
        if (err)
            return handleError(res, err);
        else if (!orderResult)
            return handleWarning(res, 'OrderID not found');

        res.json(thanhly_handler(orderResult, req.body));
    });
})

module.exports = router;