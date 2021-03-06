var request = require('request'),
	express = require('express'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	url = require('url'),
	fs = require('fs'),
	Person = require('./model/person');
var port = 4000;

mongoose.connect('mongodb://localhost/expressca');

var credentials = {
	ca: fs.readFileSync('ssl/ca.crt'),
	key: fs.readFileSync('ssl/client.key'),
	cert: fs.readFileSync('ssl/client.crt'),
	passphrase: 'admin'
}

var contactServer = function(payload){
	request.post('https://localhost:5000/', {
		key: credentials.key,
		ca: credentials.ca,
		cert: credentials.cert,
		passphrase: credentials.passphrase,
		rejectUnauthorized: false,
		form: { data: payload }
	});
}

var app = express();

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/people', function(req, res){
	Person.find({}, function(err, docs){
		res.send(docs);
	});
});

app.post('/people', function(req, res){
	console.log("POST", req.body);

	var instance = new Person();
	instance.name = req.body.name;
	instance.age = req.body.age;
	instance.save();

	contactServer(JSON.stringify(instance));

	res.send(instance);
});

app.put('/people/:id', function(req, res){
	console.log("PUT", req.body);

	Person.findById(req.params.id, function(err, instance){
		instance.name = req.body.name;
		instance.age = req.body.age;
		instance.save();

		res.send(instance);
	});
});

app.delete('/people/:id', function(req, res){
	console.log("DELETE", req.params.id);

	Person.remove(req.params.id, function(err){
		res.send();
	});
});

var server = app.listen(port);

console.log("Listening on http://localhost:%d", port)