import User from '../models/user'
import Note from '../models/note'
import Kanban from '../models/kanban'
import Lane from '../models/lane'

export function loginUser (req, res) {
	console.log(req.session)
	console.log('Received User POST login request')
	User.authentication(req.body.email, req.body.password, (err, user) => {
		if(err) return res.status(401).send(err)
		req.session.userId = user._id;
		return res.send(user)
	})
}

export function registerUser (req, res) {
	console.log('Received POST register user')
	const newUser = new User(req.body)

	// TODO Validation

	newUser.save((err, user) => {
		console.log(err,user)
		if(err) return res.status(500).send(err)
		req.session.userId = user._id
		res.send(user)
	})
}

export function logoutUser (req, res) {
	if(req.session) {
		req.session.destroy(err => {
			if(err) throw err
			res.redirect('/board')
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
