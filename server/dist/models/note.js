'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var Note = new Schema({
	name: { type: 'String', default: 'New note' },
	task: { type: 'String', default: 'New task' },
	priority: { type: 'String', default: 'normal' },
	dueDate: { type: Date },
	creationDate: { type: Date, default: Date.now },
	admins: [{ type: Schema.ObjectId, ref: 'User' }],
	users: [{ type: Schema.ObjectId, ref: 'User' }]
});

// Note.methods.toJSON = function() {
// 	const obj = this.toObject();
// 	delete obj.admins;
// 	delete obj.users;
// 	return obj;
// }

exports.default = _mongoose2.default.model('Note', Note);


Note.pre('remove', function (next) {
	console.log('elesdo');
	this.model('Lane').update({ notes: this._id }, { $pull: { notes: this._id } });
	next();
});