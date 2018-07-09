'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var Lane = new Schema({
	name: { type: 'String', default: 'New lane' },
	notes: [{ type: Schema.ObjectId, ref: 'Note', required: true }],
	color: { type: 'String', default: '#ffffff' },
	active: { type: 'Boolean', default: true },
	creationDate: { type: Date, default: Date.now }
});

Lane.pre('find', function (next) {
	console.log('find');
	this.populate('notes');
	next();
});

Lane.pre('findOne', function (next) {
	this.populate('notes');
	next();
});

Lane.pre('remove', function (next) {
	this.notes.forEach(function (note) {
		return note.remove();
	});
	next();
});

exports.default = _mongoose2.default.model('Lane', Lane);