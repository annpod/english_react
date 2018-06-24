var ObjectID = require('mongodb').ObjectID;
var db = require('../db');

exports.all = function (cb) {
	db.get().collection('question').find().toArray(function (err, docs) {
		cb(err, docs);
	})
};

exports.findById = function (id, cb) {
	db.get().collection('question').findOne({ _id: ObjectID(id)}, function (err, doc) {
		cb(err, doc);
	})
};

exports.find = function (sub, cb) {
	db.get().collection('question').find({subject: sub}).toArray(function (err, docs) {
		cb(err, docs);
	})
};

exports.create = function (question, cb) {
	db.get().collection('question').insert(question, function (err, result) {
		cb(err, result);
	})
};

exports.update = function (id, newData, cb) {
	db.get().collection('question').replaceOne(
		{ _id: ObjectID(id) },
		newData,
		function (err, result) {
			cb(err, result);
		})
};

exports.delete = function (id, cb) {
	db.get().collection('question').deleteOne(
		{ _id: ObjectID(id) },
		function (err, result) {
			cb(err, result);
		})
};