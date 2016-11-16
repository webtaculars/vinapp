var express = require('express'),
bodyParser = require('body-parser'),
app = express();


var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({	extended: true })); // support encoded bodies

require('./routes/routes.js')(app);

app.use(express.static(__dirname + './../app/'));
app.use(express.static(__dirname + './../bower_components'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


var port = process.env.PORT || 15378;

app.listen(port);

console.log('Server listening on port %s .....', port);
