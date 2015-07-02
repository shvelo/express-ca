var https = require('https'),
	express = require('express'),
	fs = require('fs');
var port = 4000;

var credentials = {
	ca: fs.readFileSync('ssl/ca.crt'),
	key: fs.readFileSync('ssl/client.key'),
	cert: fs.readFileSync('ssl/client.crt'),
	passphrase: 'admin'
}


var contactServer = function(){
	https.get({
		hostname: 'localhost',
		path: '/',
		port: 5000,
		key: credentials.key,
		ca: credentials.ca,
		cert: credentials.cert,
		passphrase: credentials.passphrase,
		rejectUnauthorized: false
	}, function(res){
		res.on('data', function(d) {
			process.stdout.write(d);
		});
	});
}

var app = express();

app.use(express.static('public'));

var server = app.listen(port);

console.log("Listening on http://localhost:%d", port)