'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.loginUser = loginUser;
exports.registerUser = registerUser;
exports.logoutUser = logoutUser;
exports.deleteUser = deleteUser;

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _note = require('../models/note');

var _note2 = _interopRequireDefault(_note);

var _kanban = require('../models/kanban');

var _kanban2 = _interopRequireDefault(_kanban);

var _lane = require('../models/lane');

var _lane2 = _interopRequireDefault(_lane);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loginUser(req, res) {
	console.log(req.session);
	console.log('Received User POST login request');
	_user2.default.authentication(req.body.email, req.body.password, function (err, user) {
		if (err) return res.status(401).send(err);
		req.session.userId = user._id;
		return res.send(user);
	});
}

function registerUser(req, res) {
	console.log('Received POST register user');
	var newUser = new _user2.default(req.body);

	// TODO Validation

	newUser.save(function (err, user) {
		console.log(err, user);
		if (err) return res.status(500).send(err);
		req.session.userId = user._id;
		res.send(user);
	});
}

function logoutUser(req, res) {
	if (req.session) {
		req.session.destroy(function (err) {
			if (err) throw err;
			res.redirect('/board');
		});
	}
}

function deleteUser(req, res) {
	// if(req.session.userId !== req.params.userId) return res.status(500).send('Not authorized')
	_user2.default.deleteOne({ _id: req.session.userId }, function (err, user) {
		if (err) throw err;
		var admins = req.session.userId;
		var users = req.session.userId;
		_kanban2.default.update({ $or: [{ admins: admins }, { users: users }] }, { $pull: { admins: admins, users: users } }, { multi: true }, function (err) {
			return console.error(err);
		});
		_lane2.default.update({ $or: [{ admins: admins }, { users: users }] }, { $pull: { admins: admins, users: users } }, { multi: true }, function (err) {
			return console.error(err);
		});
		_note2.default.update({ $or: [{ admins: admins }, { users: users }] }, { $pull: { admins: admins, users: users } }, { multi: true }, function (err) {
			return console.error(err);
		});
		res.send(err || 'Successfully removed user with id: ' + req.session.userId);
		req.session.destroy(function (err) {
			if (err) throw err;
		});
	});
}