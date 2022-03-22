const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const router = express.Router();
const jwt = require('jsonwebtoken');
const cors = require('cors');


const app = express();


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Request-Headers", "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

const allowedOrigin = process.env.ALLOWED_ORIGIN;
//  handle OPTIONS request for CORS/preflight request issues
app.options("/*", function(req, res, next){
  res.setHeader(
    'Access-Control-Allow-Origin',
    allowedOrigin
  );
  res.header(
    'Access-Control-Allow-Methods',
    'GET,PUT,POST,DELETE,OPTIONS'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, Content-Length, X-Requested-With'
  );
  res.sendStatus(200);
});



const staticPath = 'public';

// file size limits
app.use(bodyParser.json({type: 'application/json', limit: "50mb"}));

app.use(bodyParser.urlencoded({
  limit: "50mb",
  extended: false
}));

//  app.use(cookieParser());
app.use(bodyParser.text({type: 'text/plain'}));

//middleware that checks if JWT token exists and verifies it if it does exist.
//In all the future routes, this helps to know if the request is authenticated or not.
app.use(function(req, res, next) {
  // check header or url parameters or post parameters for token
  const token = req.headers['authorization'];
  if (!token) return next();

  token = token.replace('Bearer ', '');

  jwt.verify(token, process.env.JWT_SECRET, function(err, session) {
    //  console.log(err);
    if (err) {
      return res.status(401).json({
        success: false,
        message: 'Invalid API TOKEN'
      });
    } else {
      req.session = session;
      next();
    }
  });

});

//routes
const users = require('./routes/users');
app.use('/', users);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
  //  next({status: 404});
});


// error handlers
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  if (err.status === 500) {
    console.error(err.stack);
    res.json({
      error: 'Internal Server Error'
    });
  } /*else if (err.status === 404) {
    res.render('error'); //render error page
  } */ else  {
    res.json({
      error: err.message
    })
  }
});

module.exports = app;
