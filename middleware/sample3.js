// 导入内置模块http
var http = require('http');

// 导入第三方模块express
var express = require('express');

// 定义负责log的middleware
function logger(request, response, next) {
    console.log("Fist midddleware"+request.method + ': ' + request.url);
    next();// 调用下一个middleware
}

// 定义负责响应的middleware
function responser(request, response) {
    console.log("Second midddleware");
    if (request.url === '/') {
        return response.end('Welcome to Homepage!');
    }
    if (request.url === '/about') {
        return response.end('Welcome to About Page!');
    }
    response.end('404, Page Not Found!');
}

// 创建Express应用的对象
var app = express();

// 组建middleware栈，注意顺序
app.use(logger);
app.use(responser);

var server = http.createServer(app);
server.listen(3000);

/**
 1.首先要导入express模块，并创建Express应用的对象
 2.使用use方法来按顺序“登记”所定义的middleware。当收到客户端请求后，请求对象会依登记的顺序通过整个middleware栈（简单来说）
 3.注意在logger中手动调用了下一个middleware，但是在responser中没有，这是因为我们知道它是最后一个middleware，所以可以省略参数与调用步骤

 */
