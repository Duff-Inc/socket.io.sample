var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , dust = require('dustjs-linkedin')
  , kleiDust = require('klei-dust')
  , stylus = require('stylus')
  , nib = require('nib');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);

  kleiDust.setOptions({root: __dirname + '/views', extension: 'dust', cache: false});
  app.engine('dust', kleiDust.dust);
  app.set('view engine', 'dust');
  app.set('views', __dirname + '/views');

  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  // stylus - intercept any requests to public/css
  app.use(stylus.middleware({
    src: path.join(__dirname, '/styles'),
    dest: path.join(__dirname, '/public'),
    compile: function (str, path) {
      return stylus(str)
        .set('filename', path)
        .set('compress', true)
        .use(nib())
        ['import']("nib");
    }
  }));
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);

var server = http.createServer(app);
server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

var io = require('./socket.io.js');
io.init(server);
