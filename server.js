var express = require('express');
var bodyParser = require('body-parser');
var db = require('./db');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var artistsController = require('./controllers/artists');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', function (req, res) {
	res.send('Hello!');
});

app.get('/artists', artistsController.all);

app.get('/artists/:id', artistsController.findById);

app.post('/artists', artistsController.create);

app.put('/artists/:id', artistsController.update);



app.delete('/artists/:id', artistsController.delete);



db.connect("mongodb://localhost:27017/myapi", );