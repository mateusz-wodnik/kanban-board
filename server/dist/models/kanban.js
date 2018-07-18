'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var Kanban = new Schema({
	name: { type: 'String', default: 'New board' },
	lanes: [{ type: Schema.ObjectId, ref: 'Lane' }],
	description: { type: 'String', default: '' },
	priority: { type: 'Mixed', default: {} },
	creationDate: { type: Date, default: Date.now },
	admins: [{ type: Schema.ObjectId, ref: 'User' }],
	users: [{ type: Schema.ObjectId, ref: 'User' }],
	isAdmin: { type: Boolean }
});

exports.default = _mongoose2.default.model('Kanban', Kanban);