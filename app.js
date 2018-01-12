/**********************************Dependencies and path setting*********************************************************/
'use strict';

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();
var bodyParser = require('body-parser');
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/public');
//app.set('view engine', 'ejs');
//app.engine('html', require('ejs').renderFile);

app.use(express.methodOverride());

app.use(express.static(path.join(__dirname, '/public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});
var session = require('express-session');
app.use(session({
    resave: true,
    saveUninitialized: false,
    secret: 'ChamberOfSecrets'
}));
app.get('/', function(req, res) {
	res.sendFile('index.html', { root: path.join(__dirname, './public') });
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
/*
app.get('/', routes.index);
app.get('/users', user.list);*/




http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
