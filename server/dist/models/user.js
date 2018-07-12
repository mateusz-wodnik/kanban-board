'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;


var UserSchema = new Schema({
	username: { type: 'String', required: true, match: [/^[a-zA-Z0-9]+$/, 'is invalid'], unique: true },
	password: { type: 'String', required: true },
	email: { type: 'String', required: true, match: [/\S+@\S+\.\S+/, 'is invalid'], unique: true },
	firstname: { type: 'String', required: true },
	lastname: { type: 'String', required: true }
}, { timestamps: true });

UserSchema.statics.authentication = function (email, password, callback) {
	User.findOne({ email: email }).exec(function (err, user) {
		if (err) {
			return callback(err);
		} else if (!user) {
			var _err = new Error('User not found.');
			return callback(_err);
		}
		_bcrypt2.default.compare(password, user.password, function (err, result) {
			if (result === true) {
				return callback(null, user);
			} else {
				return callback();
			}
		});
	});
};

UserSchema.pre('save', function (next) {
	var _this = this;

	_bcrypt2.default.hash(this.password, 10, function (err, hash) {
		if (err) next(err);
		_this.password = hash;
		next();
	});
});

UserSchema.pre('deleteOne', function (next) {
	console.log('elo');
	this.model('Kanban').update({ users: this._id }, { $pull: { users: this._id } });
	this.model('Kanban').update({ admins: this._id }, { $pull: { admins: this._id } });
	next();
});

var User = _mongoose2.default.model('User', UserSchema);
exports.default = User;