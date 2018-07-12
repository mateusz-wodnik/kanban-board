'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _lane = require('./routes/lane.routes');

var _lane2 = _interopRequireDefault(_lane);

var _note = require('./routes/note.routes');

var _note2 = _interopRequireDefault(_note);

var _kanban = require('./routes/kanban.routes');

var _kanban2 = _interopRequireDefault(_kanban);

var _user = require('./routes/user.routes');

var _user2 = _interopRequireDefault(_user);

require('./mongoConfig.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = process.env.PORT || 5000;

var app = (0, _express2.default)();
var server = _http2.default.Server(app);

// Body parser
app.use(_bodyParser2.default.json());

// Login tracking
app.use((0, _expressSession2.default)({
	secret: 'secret',
	resave: true,
	saveUninitialized: false
}));

// Router


app.use('/api', _lane2.default);
app.use('/api', _note2.default);
app.use('/api', _kanban2.default);
app.use('/api', _user2.default);

function requiresLogin(req, res, next) {
	console.log('elo');
	if (req.session && req.session.userId) {
		return next();
	} else {
		var err = new Error('You must be logged in to view this page.');
		err.status = 401;
		return next(err);
	}
}

// Database config


// Serve static files
app.use(_express2.default.static(__dirname + '/../public'));

server.listen(port, function () {
	console.log('server listens on port: ' + port);
});