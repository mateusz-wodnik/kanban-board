export function requiresLogin(req, res, next) {
	if (req.session && req.session.userId) return next();
	const err = new Error('You must be logged in to view this page.');
	err.status = 401;
	return next(err);
}

export function requiresAdmin(req, res, next) {
	console.log(req.session.userId)
	if (req.session && req.session.isAdmin) return next();
	const err = new Error('You must be granted Admin permission to view this page.');
	err.status = 401;
	return next(err);
}
