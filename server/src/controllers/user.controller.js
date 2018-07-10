import User from '../models/user'

export function loginUser (req, res) {
	console.log('Received User POST login request')
	User.authentication(req.body.email, req.body.password, (err, user) => {
		if(err) throw err
		req.session.userId = user._id;
		return res.send(user)
	})
}

export function registerUser (req, res) {
	console.log('Received POST register user')
	const newUser = new User(req.body)
	// TODO Validation

	newUser.save((err, user) => {
		if(err)  return res.status(500).send(err)
		req.session.userId = user._id
		res.send(user)
	})

}
