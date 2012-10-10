
/*
 * GET home page.
 */

exports.index = function(req, res){
  var sio = require('../socket.io.js').sio();

  //console.log(sio);

  // // if(socket){
  // socket.emit('news', { hello: 'CHARGE!' });
  // // }

  sio.sockets.in('test').emit('news', { hello: 'CHARGE!' })
  sio.sockets.emit('from-routes', { status: 'with love from routes/index.js' });

  // socket.on('my other event', function (data) {
  //   console.log(data);
  //   });
  // });

  //sio.sockets.in('test').send('Man, good to see you back!');

  res.render('index', { title: 'Express' });
};