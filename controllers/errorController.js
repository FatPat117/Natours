const AppError = require('../utils/appError');
// DEVELOPMENT
const sendErrorDev = (err, req, res) => {
  //A) API
  if (req.originalUrl.startsWith('/api')) {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  } else {
    // B) RENDERED WEBSITE
    res.status(err.statusCode).render('error', {
      title: 'Something went wrong!',
      msg: err.message,
    });
  }
};

//PRODUCTION
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path} : ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.keyValue.name;
  console.log(value);
  const message = `Duplicate field value : ${value}. Pleace use another value!`;

  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  console.log('err:', err);
  const errmessage = Object.values(err.errors)
    .map((el) => el.path)
    .join('. ');

  console.log(errmessage);

  const message = `Invalid input data fields: ${errmessage}`;
  return new AppError(message, 400);
};

const handleJWTError = (err) =>
  new AppError('Invalide token: Please log in again!', 401);

const handleJWTExpiredError = (err) =>
  new AppError('Your token has expired! Please log in again', 401);

const sendErrorProduction = (err, req, res) => {
  // A) API
  if (req.originalUrl.startsWith('/api')) {
    if (err.isOperational) {
      // Operational, trusted error : send message to client
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
    // Programming or other unknown error: 'don't leak error details'
    else {
      // 1) Log error
      console.error('ERROR', err);

      // 2) Send generic message

      res.status(500).json({
        status: 'error',
        message: 'Something went wrong',
      });
    }
  } else {
    // B) RENDERED WEBSITE
    if (err.isOperational) {
      // Operational, trusted error : send message to client
      return res.status(err.statusCode).render('error', {
        title: 'Something went wrong!',
        msg: err.message,
      });
    }
    // Programming or other unknown error: 'don't leak error details'
    else {
      // 1) Log error
      console.error('ERROR', err);

      // 2) Send generic message

      return res.status(500).render('error', {
        title: 'Something went wrong!',
        msg: 'Please try again later',
      });
    }
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;
    if (error.kind === 'ObjectId' || err.path === '_id')
      error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);

    if (error._message === 'Validation failed')
      error = handleValidationErrorDB(error);

    if (error.name === 'JsonWebTokenError') error = handleJWTError(error);
    if (error.name === 'TokenExpiredError')
      error = handleJWTExpiredError(error);
    sendErrorProduction(error, req, res);
  }
};
