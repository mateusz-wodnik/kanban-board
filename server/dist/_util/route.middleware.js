'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.requiresLogin = requiresLogin;
exports.requiresAdmin = requiresAdmin;
function requiresLogin(req, res, next) {
	if (req.session && req.session.userId) return next();
	var err = new Error('You must be logged in to view this page.');
	err.status = 401;
	return next(err);
}

function requiresAdmin(req, res, next) {
	console.log(req.session.userId);
	if (req.session && req.session.isAdmin) return next();
	var err = new Error('You must be granted Admin permission to view this page.');
	err.status = 401;
	return next(err);
}