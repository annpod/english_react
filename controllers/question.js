var Question = require('../models/question');

exports.all = function (req, res) {
	Question.all(function (err, docs) {
		if (err) {
			console.log(err);
			return res.sendStatus(500);
		}
		res.send(docs);
	})
};

exports.findById = function (req, res) {
	Question.findById(req.params.id, function (err, doc) {
		if (err) {
			console.log(err);
			return res.sendStatus(500);
		}
		res.send(doc);
	})
};

exports.find = function (req, res) {
	Question.find(req.params.subject, function (err, docs) {
		if (err) {
			console.log(err);
			return res.sendStatus(500);
		}
		res.send(docs);
	})
};

exports.create = function (req, res) {
	var question = {
		question: req.body.question,
		answer: req.body.answer,
		category: req.body.category,
		subject: req.body.subject
	};
	Question.create(question, function (err, result) {
		if (err) {
			console.log(err);
			return res.sendStatus(500);
		}
		res.send(question);
	})
};

exports.update = function (req, res) {
	var question = {
		question: req.body.question,
		answer: req.body.answer,
		category: req.body.category,
		subject: req.body.subject
	};
	Question.update(req.params.id, question, function (err, result) {
		if (err) {
			console.log(err);
			return res.sendStatus(500);
		}
		res.sendStatus(200);
	})
};

exports.delete = function (req, res) {
	Question.delete(req.params.id, function (err, result) {
		if (err) {
			console.log(err);
			return res.sendStatus(500);
		}
		res.sendStatus(200);
	})
};