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
	_note2.default.find(function (err, docs) {
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


	var newNote = new _note2.default(note);
	newNote.save(function (err, docs) {
		if (err) res.status(500).send(err);
		_lane2.default.findOne({ _id: laneId }).then(function (lane) {
			lane.notes.push(docs);
			return lane.save();
		}).then(function () {
			res.json(docs);
		});
	});
}

function updateNote(req, res) {
	console.log('Received PUT');
	_note2.default.update({ _id: req.params.id }, req.body, function (err) {
		return res.send({ _id: req.params.id });
	});
}

function deleteNote(req, res) {
	console.log('Received DELETE');
	_note2.default.remove({ _id: req.params.id }, function (err) {
		return res.send({ _id: req.params.id });
	});
}

function getNote(req, res) {
	console.log('Received GET for single example');
	_note2.default.findById(req.params.id, function (err, doc) {
		res.send(doc);
	});
}