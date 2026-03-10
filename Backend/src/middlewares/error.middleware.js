const errorHandler = (err, req, res, next) => {
    // If status code is 200, it means an error occurred in a successful response flow, so we set it to 500
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
        stack: process.env.NODE_ENV === 'development' ? err.stack : null,
    });
};

module.exports = errorHandler;