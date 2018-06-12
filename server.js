var express = require('express');
var bodyParser = require('body-parser');
var db = require('./db');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var artistsController = require('./controllers/artists');
var vocabularyController = require('./controllers/vocabulary');
const cors = require('cors');
var app = express();

app.use(cors({ origin: true, credentials: true }));
app.use((req, res, next) => {
	res.setHeader('Expires', '-1');
	res.setHeader('Cache-Control', 'no-cache');
	next();
});

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

app.get('/vocabulary', vocabularyController.all);
app.get('/vocabulary/:id', vocabularyController.findById);
app.post('/vocabulary', vocabularyController.create);
app.put('/vocabulary/:id', vocabularyController.update);
app.delete('/vocabulary/:id', vocabularyController.delete);

db.connect("mongodb://localhost:27017/myapi", function(err) {
	if (err) {
		return console.log(err);
	}
	app.listen(3012, function() {
		console.log("API Start");
		});
	});