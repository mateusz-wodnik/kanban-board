import User from '../models/user'
import Note from '../models/note'
import Kanban from '../models/kanban'
import Lane from '../models/lane'

export function getUser (req, res) {
	if(req.session && req.session.userId) return res.status(401).send('You are not logged in')
	User.findById(req.session.userId)
		.then(user => {
			if(!user) throw Error("User not found // Not logged")
			Kanban.find({$or: [{admins: req.session.userId}, {users: req.session.userId}]}, ['_id', 'name'])
				.then(kanbans => res.status(200).send({
					kanbans,
					firstname: user.firstname,
					lastname: user.lastname,
					username: user.username,
					_id: user._id,
				}))
				.catch(err => {
					console.log(err)
					res.json(err)
				})
		})
		.catch(err => {
			console.log(err)
			res.status(500).json(err)
		})
}

export function getUsers(req, res) {
	console.log("GET users")
	User.find({}, ['-password', '-createdAt', '-updatedAt'])
		.then(users => res.send(users))
		.catch(err => console.log(err))
}

export function loginUser (req, res) {
	console.log('Received User POST login request')
	User.authentication(req.body.email, req.body.password, (err, user) => {
		if(err) return res.status(401).send(err)
		if(!user) return res.status(401).send('No user found')
		console.log(req.session)
		req.session.userId = user._id;
		console.log(user)
		Kanban.find({$or: [{admins: req.session.userId}, {users: req.session.userId}]}, ['_id', 'name'])
			.then(kanbans => res.status(200).send({
				kanbans,
				firstname: user.firstname,
				lastname: user.lastname,
				username: user.username,
				_id: user._id,
			}))
			.catch(err => console.log('login user find kanban', err))
	})
}

export function registerUser (req, res) {
	console.log('Received POST auth user')
	const newUser = new User(req.body)

	// TODO Validation

	newUser.save((err, user) => {
		console.log(err,user)
		if(err) return res.status(500).send(err)
		req.session.userId = user._id
		res.status(200).send(user)
	})
}

export function logoutUser (req, res) {
	if(req.session) {
		console.log('logout', req.session)
		req.session.destroy(err => {
			if(err) throw err
			res.status(200).send('session destroyed')
		})
	}
}

export function deleteUser (req, res) {
	// if(req.session.userId !== req.params.userId) return res.status(500).send('Not authorized')
	User.deleteOne(
		{_id: req.session.userId},
		(err, user) => {
			if(err) throw err
			const admins =  req.session.userId
			const users = req.session.userId
			Kanban.update(
				{$or: [{admins}, {users}]},
				{$pull: {admins, users}},
				{multi: true},
				err => console.error(err)
			)
			Lane.update(
				{$or: [{admins}, {users}]},
				{$pull: {admins, users}},
				{multi: true},
				err => console.error(err)
			)
			Note.update(
				{$or: [{admins}, {users}]},
				{$pull: {admins, users}},
				{multi: true},
				err => console.error(err)
			)
			res.send(err || `Successfully removed user with id: ${req.session.userId}`)
			req.session.destroy(err => {
				if(err) throw err
			})
		}
	)
}
