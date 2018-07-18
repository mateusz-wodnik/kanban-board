'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getNotes = getNotes;
exports.addNote = addNote;
exports.updateNote = updateNote;
exports.deleteNote = deleteNote;
exports.getNote = getNote;

var _note = require('../models/note');

var _note2 = _interopRequireDefault(_note);

var _lane = require('../models/lane');

var _lane2 = _interopRequireDefault(_lane);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getNotes(req, res) {
	console.log('Received GET request');
	_note2.default.find({ $or: [{ admins: req.session.userId }, { users: req.session.userId }] }, function (err, docs) {
		if (err) {
			res.status(500).send(err);
		}
		res.send(docs);
	});
}

function addNote(req, res) {
	console.log('Received POST');
	var _req$body = req.body,
	    note = _req$body.note,
	    laneId = _req$body.laneId;

	console.log(note, laneId, req.session.userId);
	_lane2.default.findOne({ $and: [{ _id: laneId }, { admins: req.session.userId }] }, function (err, lane) {
		note.admins = req.session.userId;
		var newNote = new _note2.default(note);
		newNote.save(function (err, note) {
			console.log(lane);
			if (err) return res.status(500).send(err);
			lane.notes.push(note);
			lane.save(function (err, lane) {
				if (err) return res.status(500).send(err);
				res.send(note);
			});
		});
	});
}

function updateNote(req, res) {
	console.log('Received PUT');
	_note2.default.update({ $and: [{ _id: req.params.id }, { admins: req.session.userId }] }, req.body, function (err) {
		return res.send(err || { _id: req.params.id });
	});
}

function deleteNote(req, res) {
	console.log('Received DELETE');
	_note2.default.findOne({ $and: [{ _id: req.params.id }, { admins: req.session.userId }] }, function (err, note) {
		if (err || !note) return res.status(500).send(err ? err : 'Note not found');
		note.remove();
		res.status(200).end();
	});
}

function getNote(req, res) {
	console.log('Received GET for single example');
	_note2.default.findOne({ $and: [{ _id: req.params.id }, { $or: [{ admins: req.session.userId }, { users: req.session.userId }] }] }, function (err, doc) {
		res.send(doc);
	});
}