//creating server

var http = require('http');
var app = require('./app')

var port = normalizePort(process.env.PORT )
app.set(port)
console.log('Your port number is -->',port )

var server = http.createServer(app);

server.listen(port);
function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
      return val;
    }

    if (port >= 0) {
      return port;
    }

    return false;
  }
