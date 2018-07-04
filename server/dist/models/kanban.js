'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var Kanban = new Schema({
	name: { type: 'String', required: true },
	lanes: [{ type: Schema.ObjectId, ref: 'Lane', required: true }]
});

Kanban.pre('find', function (next) {
	this.populate('lanes');
	next();
});

Kanban.pre('findOne', function (next) {
	this.populate('lanes');
	next();
});

exports.default = _mongoose2.default.model('Kanban', Kanban);