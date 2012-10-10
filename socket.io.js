var io = require('socket.io'),
    ioListen;

exports.init = function(server){
  // console.log('io', io);
  ioListen = io.listen(server);
  // console.log('ioListen', ioListen);

  ioListen.sockets.on('connection', function (socket) {
    // socket.join('test');
    socket.emit('connection-on', { status: 'connection on' });

    socket.on('client-correspondence', function (data) {
      console.log('The client just sent us a nice package.', data);
    });

    socket.on('from-routes', function (data) {
      console.log('Routes sent a postcard.', data);
    });
  });
}

exports.sio = function() {
  return ioListen;
}
