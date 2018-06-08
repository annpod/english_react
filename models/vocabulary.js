var ObjectID = require('mongodb').ObjectID;
var db = require('../db');

exports.all = function (cb) {
	db.get().collection('vocabulary').find().toArray(function (err, docs) {
		cb(err, docs);
	})
};

exports.findById = function (id, cb) {
	db.get().collection('vocabulary').findOne({ _id: ObjectID(id)}, function (err, doc) {
		cb(err, doc);
	})
};

exports.create = function (word, cb) {
	db.get().collection('vocabulary').insert(word, function (err, result) {
		cb(err, result);
	})
};

exports.update = function (id, newData, cb) {
	db.get().collection('vocabulary').replaceOne(
		{ _id: ObjectID(id) },
		newData,
		function (err, result) {
			cb(err, result);
		})
};

exports.delete = function (id, cb) {
	db.get().collection('vocabulary').deleteOne(
		{ _id: ObjectID(id) },
		function (err, result) {
			cb(err, result);
		})
};