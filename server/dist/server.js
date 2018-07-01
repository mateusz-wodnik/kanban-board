'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _example = require('./routes/example.routes');

var _example2 = _interopRequireDefault(_example);

require('./mongoConfig.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = process.env.PORT || 5000;

var app = (0, _express2.default)();
var server = _http2.default.Server(app);

// Body parser
app.use(_bodyParser2.default.json());

// Router

app.use('/api', _example2.default);

// Database config


// Serve static files
app.use(_express2.default.static(__dirname + '/../public'));

server.listen(port, function () {
  console.log('server listens on port: ' + port);
});