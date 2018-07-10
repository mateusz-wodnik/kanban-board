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

// TODO Encryption password method
UserSchema.statics.authentication = function (email, password, callback) {
	User.findOne({ email: email }).exec(function (err, user) {
		if (err) {
			return callback(err);
		} else if (!user) {
			var err = new Error('User not found.');
			err.status = 401;
			return callback(err);
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

var User = _mongoose2.default.model('User', UserSchema);
exports.default = User;