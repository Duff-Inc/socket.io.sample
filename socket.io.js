var io = require('socket.io');
var express= require('express')
var app = express()
  , server = require('http').createServer(app)
  , io = io.listen(server);

exports.init = function(){
  server.listen(3001);
  io.sockets.on('connection', function (socket) {
  socket.join('test');
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
    });
  });
}

exports.sio = function() {
  return io;
}
