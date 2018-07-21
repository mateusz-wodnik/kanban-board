'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getUser = getUser;
exports.getUsers = getUsers;
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

function getUser(req, res) {
	if (!req.session.userId) return res.status(401).send('You are not logged in');
	_user2.default.findById(req.session.userId).then(function (user) {
		if (!user) throw Error("User not found // Not logged");
		_kanban2.default.find({ $or: [{ admins: req.session.userId }, { users: req.session.userId }] }, ['_id', 'name']).then(function (kanbans) {
			return res.status(200).send({
				kanbans: kanbans,
				firstname: user.firstname,
				lastname: user.lastname,
				username: user.username,
				_id: user._id
			});
		}).catch(function (err) {
			console.log(err);
			res.json(err);
		});
	}).catch(function (err) {
		console.log(err);
		res.status(500).json(err);
	});
}

function getUsers(req, res) {
	console.log("GET users");
	if (!req.session.userId) return res.status(401).send("You're not logged");
	_user2.default.find({}, ['-password', '-createdAt', '-updatedAt', '-email']).then(function (users) {
		return res.send(users);
	}).catch(function (err) {
		return console.log(err);
	});
}

function loginUser(req, res) {
	console.log('Received User POST login request');
	_user2.default.authentication(req.body.email, req.body.password, function (err, user) {
		if (err) return res.status(401).send(err);
		if (!user) return res.status(401).send('No user found');
		console.log(req.session);
		req.session.userId = user._id;
		console.log(user);
		_kanban2.default.find({ $or: [{ admins: req.session.userId }, { users: req.session.userId }] }, ['_id', 'name']).then(function (kanbans) {
			return res.status(200).send({
				kanbans: kanbans,
				firstname: user.firstname,
				lastname: user.lastname,
				username: user.username,
				_id: user._id
			});
		}).catch(function (err) {
			return console.log('login user find kanban', err);
		});
	});
}

function registerUser(req, res) {
	console.log('Received POST auth user');
	var newUser = new _user2.default(req.body);

	// TODO Validation

	newUser.save(function (err, user) {
		console.log(err, user);
		if (err) return res.status(500).send(err);
		req.session.userId = user._id;
		res.status(200).send(user);
	});
}

function logoutUser(req, res) {
	if (req.session) {
		console.log('logout', req.session);
		req.session.destroy(function (err) {
			if (err) throw err;
			res.status(200).send('session destroyed');
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