var express = require('express');
var bodyParser = require('body-parser');
var db = require('./db');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var vocabularyController = require('./controllers/vocabulary');
var questionController = require('./controllers/question');
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
	res.send('Hello!');});


app.get('/vocabulary', vocabularyController.all);
app.get('/vocabulary/:id', vocabularyController.findById);
app.post('/vocabulary', vocabularyController.create);
app.put('/vocabulary/:id', vocabularyController.update);
app.delete('/vocabulary/:id', vocabularyController.delete);

app.get('/question', questionController.all);
app.get('/question/:id', questionController.findById);
app.post('/question', questionController.create);
app.put('/question/:id', questionController.update);
app.delete('/question/:id', questionController.delete);

app.get('/subject/:subject/question', questionController.find);

db.connect("mongodb://localhost:27017/myapi", function(err) {
	if (err) {
		return console.log(err);
	}
	app.listen(3012, function() {
		console.log("API Start");
		});
	});