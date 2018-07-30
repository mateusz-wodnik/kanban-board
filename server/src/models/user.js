import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import bcrypt from 'bcrypt';

const UserSchema = new Schema({
	username: { type: 'String', required: true, match: [/^[a-zA-Z0-9]+$/, 'is invalid'], unique: true},
	password: { type: 'String', required: true },
	email: { type: 'String', required: true, match: [/\S+@\S+\.\S+/, 'is invalid'], unique: true},
	firstname: { type: 'String', required: true },
	lastname: { type: 'String', required: true },
}, {timestamps: true});


UserSchema.statics.authentication = function (email, password, callback) {
	User.findOne({ email: email })
		.exec(function (err, user) {
			if (err) {
				return callback(err);
			} else if (!user) {
				const err = new Error('User not found.');
				return callback(err);
			}
			bcrypt.compare(password, user.password, function (err, result) {
				if (result === true) {
					return callback(null, user);
				} else {
					return callback(err);
				}
			});
		});
}


UserSchema.pre('save', function (next) {
	bcrypt.hash(this.password, 10, (err, hash) => {
		if (err) next(err);
		this.password = hash;
		next();
	});
});

UserSchema.pre('deleteOne', function (next) {
	this.model('Kanban').update({users: this._id}, {$pull: { users: this._id }});
	this.model('Kanban').update({admins: this._id}, {$pull: { admins: this._id }});
	next();
});


const User = mongoose.model('User', UserSchema);
export default User;
