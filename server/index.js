var https = require('https'),
	fs = require('fs'),
	winston = require('winston'),
	express = require('express');

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
winston.remove(winston.transports.Console);

var app = express();

app.get('/', function(req, res){
	winston.info("Gov'rnor access detected");
	res.send("Ello gov'rnor!");
});

var server = https.createServer(credentials, app);

server.listen(port);

console.log("Listening on https://localhost:%d", port);