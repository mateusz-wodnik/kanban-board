import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import bcrypt from 'bcrypt'

const UserSchema = new Schema({
	username: { type: 'String', required: true, match: [/^[a-zA-Z0-9]+$/, 'is invalid'], unique: true},
	password: { type: 'String', required: true },
	email: { type: 'String', required: true, match: [/\S+@\S+\.\S+/, 'is invalid'], unique: true},
	firstname: { type: 'String', required: true },
	lastname: { type: 'String', required: true }
}, {timestamps: true});

// TODO Encryption password method
UserSchema.statics.authentication = function (email, password, callback) {
	User.findOne({ email: email })
		.exec(function (err, user) {
			if (err) {
				return callback(err)
			} else if (!user) {
				var err = new Error('User not found.');
				err.status = 401;
				return callback(err);
			}
			bcrypt.compare(password, user.password, function (err, result) {
				if (result === true) {
					return callback(null, user);
				} else {
					return callback();
				}
			})
		});
}


UserSchema.pre('save', function (next) {
	bcrypt.hash(this.password, 10, (err, hash) => {
		if (err) next(err);
		this.password = hash;
		next();
	});
})


const User = mongoose.model('User', UserSchema)
export default User
