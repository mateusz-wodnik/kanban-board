'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.getKanbans = getKanbans;
exports.addKanban = addKanban;
exports.updateKanban = updateKanban;
exports.deleteKanban = deleteKanban;
exports.getKanban = getKanban;

var _kanban = require('../models/kanban');

var _kanban2 = _interopRequireDefault(_kanban);

var _lane = require('../models/lane');

var _lane2 = _interopRequireDefault(_lane);

var _note = require('../models/note');

var _note2 = _interopRequireDefault(_note);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function getKanbans(req, res) {
	console.log('Received GET request');
	var user = req.session.userId;
	console.log(req.session);
	_kanban2.default.find({ $or: [{ admins: req.session.userId }, { users: req.session.userId }] }).populate({
		path: 'lanes',
		// select: ['-admins', '-users'],
		populate: {
			path: 'notes'
			// select: ['-admins', '-users'],
		}
	}).then(function (docs) {
		return res.send(docs);
	}).catch(function (err) {
		return res.send(err);
	});
}

function addKanban(req, res) {
	console.log('eloeloelo');
	console.log('Received POST');
	if (!req.session.userId) return res.status(500).send('You have to log in');
	var newKanban = new _kanban2.default(req.body.kanban);
	newKanban.admins.push(req.session.userId);
	var newLanes = req.body.lanes.map(function (lane) {
		var newLane = new _lane2.default(lane);
		newLane.admins.push(req.session.userId);
		return newLane;
	});
	newKanban.lanes = newLanes;
	newKanban.save(function (err, docs) {
		if (err) res.status(500).send(err);
		_lane2.default.collection.insert(newLanes);
		res.send(docs);
	});
}

function updateKanban(req, res) {
	console.log('Received PUT');

	var _req$body = req.body,
	    _req$body$admins = _req$body.admins,
	    admins = _req$body$admins === undefined ? '' : _req$body$admins,
	    _req$body$users = _req$body.users,
	    users = _req$body$users === undefined ? '' : _req$body$users,
	    body = _objectWithoutProperties(_req$body, ['admins', 'users']);

	_kanban2.default.findOneAndUpdate({ $and: [{ _id: req.params.id }, { admins: req.session.userId }] }, { $set: _extends({}, body), $addToSet: { admins: admins, users: users } }).populate('lanes').then(function (kanban) {
		var notes = [];
		kanban.lanes.forEach(function (lane) {
			return notes.push.apply(notes, _toConsumableArray(lane.notes));
		});
		_lane2.default.update({ _id: { $in: kanban.lanes } }, { $addToSet: { admins: admins, users: users } }, { multi: true }, function (err) {
			if (err) throw err;
		});
		_note2.default.update({ _id: { $in: notes } }, { $addToSet: { admins: admins, users: users } }, { multi: true }, function (err) {
			if (err) throw err;
		});
		res.send('Kanban updated');
	}).catch(function (err) {
		return res.send('No match found');
	});
}

function deleteKanban(req, res) {
	console.log('Received DELETE');
	_kanban2.default.findOne({ $and: [{ _id: req.params.id }, { admins: req.session.userId }] }).populate('lanes').then(function (kanban) {
		var notes = [];
		kanban.lanes.forEach(function (lane) {
			return notes.push.apply(notes, _toConsumableArray(lane.notes));
		});
		// Delete reference lanes and notes
		_lane2.default.remove({ _id: { $in: kanban.lanes } }).catch(function (err) {
			return console.error(err);
		});
		_note2.default.remove({ _id: { $in: notes } }).catch(function (err) {
			return console.error(err);
		});
		kanban.remove(function () {
			res.status(200).send('Kanban removed');
		});
	}).catch(function (err) {
		return res.status(500).send('Wrong kanban id or lack of credentials');
	});
}

function getKanban(req, res) {
	console.log('Received GET for single example');
	_kanban2.default.findById(req.params.id).populate({
		path: 'lanes',
		// select: ['-admins', '-users'],
		populate: {
			path: 'notes'
			// select: ['-admins', '-users'],
		}
	}).then(function (kanban) {
		console.log(req.session.userId);
		console.log(kanban.admins[0]);
		console.log(kanban.admins.includes(req.session.userId));
		kanban.isAdmin = kanban.admins.some(function (admin) {
			return admin == req.session.userId;
		});
		kanban.save();
		res.send(kanban);
	}).catch(function (err) {
		return console.error(err);
	});
}