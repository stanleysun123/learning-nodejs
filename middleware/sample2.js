var express = require('express');
var app = express();

//Simple request time logger
app.use(function(req, res, next){
    console.log("A new request received at " + Date.now());
    //This function call is very important. It tells that more processing is
    //required for the current request and is in the next middleware
    //function/route handler.
    next();
});


//Second Middleware
app.use(function(req, res, next){
    console.log("Second middleware function  " + Date.now());
    //This function call is very important. It tells that more processing is
    //required for the current request and is in the next middleware
    //function/route handler.
    next();
});


app.get('/',function(req,res){
     res.send("Finished here")
})



app.listen(3000);
