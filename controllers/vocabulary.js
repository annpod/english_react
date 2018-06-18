var Vocabulary = require('../models/vocabulary');
var uniqid = require('uniqid');

exports.all = function (req, res) {
	Vocabulary.all(function (err, docs) {
		if (err) {
			console.log(err);
			return res.sendStatus(500);
		}
		res.send(docs);
	})
};

exports.findById = function (req, res) {
	Vocabulary.findById(req.params.id, function (err, doc) {
		if (err) {
			console.log(err);
			return res.sendStatus(500);
		}
		res.send(doc);
	})
};

exports.create = function (req, res) {
	var word = {
		word: req.body.word,
		translation: req.body.translation,
		category: req.body.category
	};
	Vocabulary.create(word, function (err, result) {
		if (err) {
			console.log(err);
			return res.sendStatus(500);
		}
		res.send(word);
	})
};

exports.update = function (req, res) {
	var word = {
		word: req.body.word,
		translation: req.body.translation,
		category: req.body.category
	};
	Vocabulary.update(req.params.id, word, function (err, result) {
		if (err) {
			console.log(err);
			return res.sendStatus(500);
		}
		res.sendStatus(200);
	})
};

exports.delete = function (req, res) {
	Vocabulary.delete(req.params.id, function (err, result) {
		if (err) {
			console.log(err);
			return res.sendStatus(500);
		}
		res.sendStatus(200);
	})
};