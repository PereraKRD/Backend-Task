module.exports = (err, req, res, next) => {
    // 500 - internal server error
    err.statusCode = err.statusCode || 500;

        res.status(err.statusCode).json({
            success: false,
            error: err,
            errMessage: err.message,
            stack: err.stack
        })
}