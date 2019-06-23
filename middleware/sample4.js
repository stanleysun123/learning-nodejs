var http = require('http');
var path = require('path');
var express = require('express');

var app = express();

// +++
var publicFilesPath = path.join(__dirname, 'public');
var publicFilesServer = express.static(publicFilesPath);
app.use(publicFilesServer);
// +++

app.use(function responser(request, response) {
    if (request.url === '/') {
        return response.end('Welcome to Homepage!');
    }
    if (request.url === '/about') {
        return response.end('Welcome to About Page!');
    }
    response.end('404, Page Not Found!');
});

var server = http.createServer(app);

server.listen(3000);

/*
http://localhost:3000/middleware_desc.jpg
express.static middleware
 */