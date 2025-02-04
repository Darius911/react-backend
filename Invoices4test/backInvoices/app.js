//viskas, kas susiję su express yra viename faile, šis failas labiau yra skirtas middlewares, kurios prieinamos visiems requests

const express = require('express');
const invoiceRouter = require('./routes/invoiceRoutes');
const userRouter = require('./routes/userRoutes');
const errorHandler = require('./middlewares/errorHandler');
const AppError = require('./utilities/appError');
const cookieParser = require('cookie-parser');
const cors = require("cors");


// create server
const app = express();
app.use(cors())

// Middleware, that only parses json and only looks at requests where the Content-Type header matches the type option.
app.use(express.json());






app.use('/api/v1/invoices', invoiceRouter);


app.all('*', (req, res, next) => {
  
  const error = new AppError(`Not found - ${req.originalUrl}`, 404);
  next(error);
});


app.use(errorHandler);

module.exports = app;
