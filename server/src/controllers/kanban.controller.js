import Kanban from '../models/kanban';
import Lane from '../models/lane'
import Note from '../models/note'

export function getKanbans(req, res) {
	console.log('Received GET request')
	const user = req.session.userId
	console.log(req.session)
	Kanban.find({$or: [{admins: req.session.userId}, {users: req.session.userId}]})
		.populate({
			path: 'lanes',
			// select: ['-admins', '-users'],
			populate: {
				path: 'notes',
				// select: ['-admins', '-users'],
			}
		})
		.then(docs => res.send(docs))
		.catch(err => res.send(err))
}

export function addKanban(req, res) {
	console.log('eloeloelo')
	console.log(`Received POST`)
	if(!req.session.userId) return res.status(500).send('You have to log in');
	const newKanban = new Kanban(req.body.kanban);
	newKanban.admins.push(req.session.userId);
	const newLanes = req.body.lanes.map(lane => {
		const newLane = new Lane(lane);
		newLane.admins.push(req.session.userId);
		return newLane;
	})
	newKanban.lanes = newLanes;
	newKanban.save((err, docs) => {
		if(err) res.status(500).send(err);
		Lane.collection.insert(newLanes);
		res.send(docs);
	})
}

export function updateKanban(req, res) {
	console.log(`Received PUT`)
	const {admins= '', users= '', ...body} = req.body
	console.log(req.body, req.params.id, req.session.userId)
	Kanban.findOneAndUpdate(
		{$and: [{_id: req.params.id}, {admins:req.session.userId}]},
		{$set: {...body}, $addToSet: {admins, users}})
		.populate('lanes')
		.then(kanban => {
				console.log(kanban)
				const notes = []
				kanban.lanes.forEach(lane => notes.push(...lane.notes))
				Lane.update(
					{_id: {$in: kanban.lanes}},
					{$addToSet: {admins, users}},
					{multi: true},
					err => {if(err) throw err}
				);
				Note.update(
					{_id: {$in: notes}},
					{$addToSet: {admins, users}},
					{multi: true},
					err => {if(err) throw err}
				);
				res.send('Kanban updated')
		})
		.catch(err => console.log(err))
}

export function deleteKanban(req, res) {
	console.log(`Received DELETE`)
	Kanban.findOne({$and: [{_id: req.params.id}, {admins: req.session.userId}]})
		.populate('lanes')
		.then(kanban => {
			const notes = []
			kanban.lanes.forEach(lane => notes.push(...lane.notes))
			// Delete reference lanes and notes
			Lane.remove({_id: {$in: kanban.lanes}})
				.catch(err => console.error(err))
			Note.remove({_id: {$in: notes}})
				.catch(err => console.error(err))
			kanban.remove(() => {
				res.status(200).send('Kanban removed');
			});
		})
		.catch(err => res.status(500).send('Wrong kanban id or lack of credentials'));
}

export function getKanban(req, res) {
	console.log(`Received GET for single example`)
	Kanban.findById(req.params.id)
		.populate({
			path: 'lanes',
			// select: ['-admins', '-users'],
			populate: {
				path: 'notes',
				// select: ['-admins', '-users'],
			}
		})
		.then(kanban => {
			console.log(req.session.userId)
			console.log(kanban.admins[0])
			console.log(kanban.admins.includes(req.session.userId))
			kanban.isAdmin = kanban.admins.some(admin => admin == req.session.userId)
			kanban.save()
			res.send(kanban)
		})
		.catch(err => console.error(err))
}
