Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. These functions are used to modify req and res objects for tasks like parsing request bodies, adding response headers, etc.

Here is a simple example of a middleware function in action −

```
var express = require('express');
var app = express();

//Simple request time logger
app.use(function(req, res, next){
   console.log("A new request received at " + Date.now());
   
   //This function call is very important. It tells that more processing is
   //required for the current request and is in the next middleware
   function/route handler.
   next();
});

app.listen(3000);
```


Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named next.

Middleware functions can perform the following tasks:

Execute any code.
Make changes to the request and the response objects.
End the request-response cycle.
Call the next middleware function in the stack.
If the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function. Otherwise, the request will be left hanging.

An Express application can use the following types of middleware:

Application-level middleware
Router-level middleware
Error-handling middleware
Built-in middleware
Third-party middleware
You can load application-level and router-level middleware with an optional mount path. You can also load a series of middleware functions together, which creates a sub-stack of the middleware system at a mount point.


##Application-level middleware

Bind application-level middleware to an instance of the app object by using the app.use() and app.METHOD() functions, where METHOD is the HTTP method of the request that the middleware function handles (such as GET, PUT, or POST) in lowercase.

This example shows a middleware function with no mount path. The function is executed every time the app receives a request.

var app = express()
```
app.use(function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})
```

This example shows a middleware function mounted on the /user/:id path. The function is executed for any type of HTTP request on the /user/:id path.


```
app.use('/user/:id', function (req, res, next) {
  console.log('Request Type:', req.method)
  next()
})
```

This example shows a route and its handler function (middleware system). The function handles GET requests to the /user/:id path.
```

app.get('/user/:id', function (req, res, next) {
  res.send('USER')
})

```

###Router-level middleware
Router-level middleware works in the same way as application-level middleware, except it is bound to an instance of express.Router().

```
var router = express.Router()
Load router-level middleware by using the router.use() and router.METHOD() functions.

The following example code replicates the middleware system that is shown above for application-level middleware, by using router-level middleware:

var app = express()
var router = express.Router()

// a middleware function with no mount path. This code is executed for every request to the router
router.use(function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})

// a middleware sub-stack shows request info for any type of HTTP request to the /user/:id path
router.use('/user/:id', function (req, res, next) {
  console.log('Request URL:', req.originalUrl)
  next()
}, function (req, res, next) {
  console.log('Request Type:', req.method)
  next()
})

// a middleware sub-stack that handles GET requests to the /user/:id path
router.get('/user/:id', function (req, res, next) {
  // if the user ID is 0, skip to the next router
  if (req.params.id === '0') next('route')
  // otherwise pass control to the next middleware function in this stack
  else next()
}, function (req, res, next) {
  // render a regular page
  res.render('regular')
})

// handler for the /user/:id path, which renders a special page
router.get('/user/:id', function (req, res, next) {
  console.log(req.params.id)
  res.render('special')
})

// mount the router on the app
app.use('/', router)

```


###Error-handling middleware


Define error-handling middleware functions in the same way as other middleware functions, except with four arguments instead of three, specifically with the signature (err, req, res, next)):
```
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
```

###Built-in middleware

Express has the following built-in middleware functions:

express.static serves static assets such as HTML files, images, and so on.
express.json parses incoming requests with JSON payloads. NOTE: Available with Express 4.16.0+
express.urlencoded parses incoming requests with URL-encoded payloads. NOTE: Available with Express 4.16.0+


###Third-party middleware

Use third-party middleware to add functionality to Express apps.

Install the Node.js module for the required functionality, then load it in your app at the application level or at the router level.

The following example illustrates installing and loading the cookie-parsing middleware function cookie-parser.
```
$ npm install cookie-parser
var express = require('express')
var app = express()
var cookieParser = require('cookie-parser')

// load the cookie-parsing middleware
app.use(cookieParser())

```