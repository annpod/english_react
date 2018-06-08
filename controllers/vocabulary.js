var Vocabulary = require('../models/vocabulary');

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
		en: req.body.en,
		ru: req.body.ru,
		set: req.body.set
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
		en: req.body.en,
		ru: req.body.ru,
		set: req.body.set
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