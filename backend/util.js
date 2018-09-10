class Utility {

    handleError(res, err) {
        res.status = 500;
        res.send(err);
    }

    handleWarning(res, msg) {

        res.status = 404;
        res.json({ 'info': msg });
    }

    handleSuccess(res, result) {
        res.status = 200;
        res.json(result)
    }
}

module.exports = Utility