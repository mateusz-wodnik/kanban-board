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
	creationDate: { type: Date, default: Date.now },
	admins: [{ type: Schema.ObjectId, ref: 'User' }],
	users: [{ type: Schema.ObjectId, ref: 'User' }]
});

// Lane.methods.toJSON = function() {
// 	const obj = this.toObject();
// 	delete obj.admins;
// 	delete obj.users;
// 	return obj;
// }


Lane.pre('findOne', function (next) {
	this.populate('notes');
	next();
});

Lane.pre('remove', function (next) {
	this.model('Kanban').find({ lanes: this._id }).then(function (res) {
		return console.log(res);
	});
	console.log(this);
	this.model('Kanban').update({ lanes: this._id }, { $pull: { lanes: this._id } }, function (err) {
		return console.log(err || "Removed Lane id from Kanban lanes arr");
	});

	this.notes.forEach(function (note) {
		return note.remove();
	});
	next();
});

exports.default = _mongoose2.default.model('Lane', Lane);