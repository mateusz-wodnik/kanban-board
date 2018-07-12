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

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getLanes(req, res) {
	console.log('Received GET request');
	_lane2.default.find({ $or: [{ admins: req.session.userId }, { users: req.session.userId }] }, function (err, docs) {
		if (err) res.status(500).send(err);
		res.send(docs);
	});
}

function addLane(req, res) {
	console.log('Received POST');
	var _req$body = req.body,
	    lane = _req$body.lane,
	    kanbanId = _req$body.kanbanId;

	_kanban2.default.findOne({ $and: [{ _id: kanbanId }, { admins: req.session.userId }] }).then(function (kanban) {
		if (!kanban) return res.status(500).send('No authorisation');
		var newLane = new _lane2.default(lane);
		newLane.admins.addToSet(req.session.userId);
		newLane.save(function (err, lane) {
			if (err) return res.status(500).send(err);
			kanban.lanes.addToSet(lane._id);
			kanban.save();
			res.send(lane);
		});
	});
}

function updateLane(req, res) {
	console.log('Received PUT');
	_lane2.default.update({ $and: [{ _id: req.params.id }, { admins: req.session.userId }] }, req.body, function (err) {
		return res.send(err || { _id: req.params.id });
	});
}

function deleteLane(req, res) {
	console.log('Received DELETE');
	_lane2.default.findOne({ $and: [{ _id: req.params.id }, { admins: req.session.userId }] }, function (err, lane) {
		if (err) return res.status(500).send(err);
		if (!lane) return res.status(500).send('Lane not found');
		lane.remove(function () {
			return res.status(200).end();
		});
	});
}

function getLane(req, res) {
	console.log('Received GET for single example');
	_lane2.default.findOne({ $and: [{ _id: req.params.id }, { $or: [{ admins: req.session.userId }, { users: req.session.userId }] }] }, function (err, doc) {
		res.send(doc);
	});
}