// const { stack } = require("../routes/animalRoute")

// const errorMiddleware = (err, req, res, next) => {
//     console.log('here is an error middleware!');
//     const statusCode = res.statusCode ? res.statusCode : 500;
//     res.status(statusCode);
//     res.json({
//         message: err.message,
//         stack: process.env.NODE_ENV === "development" ? err.stack : null
//     });
// };

// module.exports = errorMiddleware;

const errorMiddleware = (err, req, res, next) => {
    console.log('An error occurred:', err);

    if (res.headersSent) {
        // If headers have already been sent, delegate to the default Express error handler
        return next(err);
    }

    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined
    });
};

module.exports = errorMiddleware;
