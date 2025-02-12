class AppError extends Error {
    constructor(message, statusCode) {
        console.log(message);
        console.log(statusCode);
        
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor); // irasysime vieta kurioje kilo klaida
    }
}
module.exports = AppError;