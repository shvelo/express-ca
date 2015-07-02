var https = require('https'),
	fs = require('fs'),
	winston = require('winston'),
	express = require('express'),
	bodyParser = require('body-parser');

var port = 5000;

var credentials = {
	ca: fs.readFileSync('ssl/ca.crt'),
	key: fs.readFileSync('ssl/server.key'),
	cert: fs.readFileSync('ssl/server.crt'),
	passphrase: 'admin',
	requestCert: true,
	rejectUnauthorized: true
}

winston.add(winston.transports.File, { filename: 'events.log' });

var app = express();
app.use(bodyParser.json());

app.post('/', function(req, res){
	winston.info(req.body);
	res.send(req.body);
});

var server = https.createServer(credentials, app);

server.listen(port);

console.log("Listening on https://localhost:%d", port);