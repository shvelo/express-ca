var https = require('https'),
	fs = require('fs'),
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

var app = express();

app.get('/', function(req, res){
	res.send("Ello govr'nor!");
});

var server = https.createServer(credentials, app);

server.listen(port);

console.log("Listening on https://localhost:%d", port);