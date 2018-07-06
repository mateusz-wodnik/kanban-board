'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getKanbans = getKanbans;
exports.addKanban = addKanban;
exports.updateKanban = updateKanban;
exports.deleteKanban = deleteKanban;
exports.getKanban = getKanban;

var _kanban = require('../models/kanban');

var _kanban2 = _interopRequireDefault(_kanban);

var _lane = require('../models/lane');

var _lane2 = _interopRequireDefault(_lane);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getKanbans(req, res) {
	console.log('Received GET request');
	_kanban2.default.find(function (err, docs) {
		if (err) {
			res.status(500).send(err);
		}
		res.send(docs);
	});
}

function addKanban(req, res) {
	console.log('Received POST');
	var newKanban = new _kanban2.default(req.body.kanban);
	var newLanes = req.body.lanes.map(function (lane) {
		var newLane = new _lane2.default(lane);
		newKanban.lanes.push(newLane);
		return newLane;
	});
	newKanban.save(function (err, docs) {
		if (err) res.status(500).send(err);
		_lane2.default.collection.insert(newLanes);
		res.send(docs);
	});
}

function updateKanban(req, res) {
	console.log('Received PUT');
	_kanban2.default.update({ _id: req.params.id }, req.body, function (err) {
		return res.send({ _id: req.params.id });
	});
}

function deleteKanban(req, res) {
	console.log('Received DELETE');
	_kanban2.default.findOne({ _id: req.params.id }, function (err, kanban) {
		if (err) {
			res.status(500).send(err);
		}

		// Delete reference lanes
		kanban.lanes.forEach(function (lane) {
			return lane.remove();
		});

		kanban.remove(function () {
			res.status(200).end();
		});
	});
}

function getKanban(req, res) {
	console.log('Received GET for single example');
	_kanban2.default.findById(req.params.id, function (err, doc) {
		res.send(doc);
	});
}