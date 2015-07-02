var https = require('https'),
	fs = require('fs');

var credentials = {
	ca: fs.readFileSync('ssl/ca.crt'),
	key: fs.readFileSync('ssl/client.key'),
	cert: fs.readFileSync('ssl/client.crt'),
	passphrase: 'admin'
}

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