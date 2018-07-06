'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getLanes = getLanes;
exports.addLane = addLane;
exports.updateLane = updateLane;
exports.deleteLane = deleteLane;
exports.getLane = getLane;

var _lane = require('../models/lane');

var _lane2 = _interopRequireDefault(_lane);

var _kanban = require('../models/kanban');

var _kanban2 = _interopRequireDefault(_kanban);

var _note = require('../models/note');

var _note2 = _interopRequireDefault(_note);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getLanes(req, res) {
	console.log('Received GET request');
	_lane2.default.find(function (err, docs) {
		if (err) {
			res.status(500).send(err);
		}
		res.send(docs);
	});
}

function addLane(req, res) {
	console.log('Received POST');
	var _req$body = req.body,
	    lane = _req$body.lane,
	    kanbanId = _req$body.kanbanId;


	var newLane = new _lane2.default(lane);
	newLane.save(function (err, docs) {
		console.log(docs);
		if (err) res.status(500).send(err);
		_kanban2.default.findOne({ _id: kanbanId }).then(function (kanban) {
			kanban.lanes.push(docs);
			return kanban.save();
		}).then(function () {
			res.json(docs);
		});
	});
}

function updateLane(req, res) {
	console.log('Received PUT');
	_lane2.default.update({ _id: req.params.id }, req.body, function (err) {
		return res.send({ _id: req.params.id });
	});
}

function deleteLane(req, res) {
	console.log('Received DELETE');
	_lane2.default.findOne({ _id: req.params.id }, function (err, lane) {
		if (err) {
			res.status(500).send(err);
		}

		lane.remove(function () {
			res.status(200).end();
		});
	});
}

function getLane(req, res) {
	console.log('Received GET for single example');
	_lane2.default.findById(req.params.id, function (err, doc) {
		res.send(doc);
	});
}