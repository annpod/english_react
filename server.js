var express = require('express');
var bodyParser = require('body-parser');
var db = require('./db');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', function (req, res) {
	res.send('Hello!');
});

app.get('/artists', function (req, res) {
	res.send(artists);
});

app.get('/artists/:id', function (req, res) {

	db.get().collection('artists').findOne({ _id: ObjectID(req.params.id) }, function(err, doc){
		if (err) {
			console.log(err);
			return res.sendStatus(500);
		}
		res.send(doc);
	})
});

app.post('/artists', function (req, res) {
	var artist = {
		name: req.body.name
	};

	db.get().collection('artists').insert(artist, function(err, result) {
		if (err) {
			console.log(err);
			return res.sendStatus(500);
		}
		res.send(artist);
	})
});


app.put('/artists/:id', function (req, res) {
	db.get().collection('artists').updateOne(
		{ _id: ObjectID(req.params.id) },
		{ name: req.body.name },
		function (err, result) {
			if(err) {
				console.log(err);
				return res.sendStatus(500);
			}
			res.sendStatus(200);
	})
});

app.delete('/artists/:id', function (req, res) {
	db.get().collection('artists').deleteOne(
		{ _id: ObjectID(req.params.id) },
		function (err, result) {
			if(err) {
				console.log(err);
				return res.sendStatus(500);
			}
			res.sendStatus(200);
	})
});



db.connect("mongodb://localhost:27017/myapi", function(err) {
	if (err) {
		return console.log(err);
	}
	app.listen(3012, function() {
		console.log("API Start");
	});
});