'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.loginUser = loginUser;
exports.registerUser = registerUser;

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loginUser(req, res) {
	console.log('Received User POST login request');
	_user2.default.authentication(req.body.email, req.body.password, function (err, user) {
		if (err) throw err;
		req.session.userId = user._id;
		return res.send(user);
	});
}

function registerUser(req, res) {
	console.log('Received POST register user');
	var newUser = new _user2.default(req.body);
	// TODO Validation

	newUser.save(function (err, user) {
		if (err) return res.status(500).send(err);
		req.session.userId = user._id;
		res.send(user);
	});
}