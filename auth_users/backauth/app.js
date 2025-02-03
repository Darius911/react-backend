//viskas, kas susiję su express yra viename faile, šis failas labiau yra skirtas middlewares, kurios prieinamos visiems requests

const express = require('express');
const tourRouter = require('./routes/tourRoutes');
const errorHandler = require('./middlewares/errorHandler');
const AppError = require('./utilities/appError');
const userRouter = require('./routes/userRoutes');
const cookieParser = require('cookie-parser');
const cors = require('cors')

// create server
const app = express();

// Middleware, that only parses json and only looks at requests where the Content-Type header matches the type option.
app.use(express.json());




//Middleware for cookies parsing
app.use(cookieParser());
//cors
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true
  })
);


//our custom middlewares, working for any request
// app.use((req, res, next) => {
//   console.log('Hello from the middleware for any route');

//   //jei nerarašysime next(), request response cycle sustos ir mes neprieisime prie router handlerio ir response neišsisiųs
//   next();
// });

// //we add request time on every request
// app.use((req, res, next) => {
//   req.requestTime = new Date().toISOString();
//   next();
// });

// ROUTES
//naudojame tourRouter, procesas vadinasi "mounting the router"
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  // const err = new Error(`Not found - ${req.originalUrl}`);
  // err.status = "fail";
  // err.statusCode = 404;
  const error = new AppError(`Not found - ${req.originalUrl}`, 404);
  next(error);
});


app.use(errorHandler);

module.exports = app;
