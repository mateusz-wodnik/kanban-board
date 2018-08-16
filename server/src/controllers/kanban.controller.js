import Kanban from '../models/kanban';
import Lane from '../models/lane';
import Note from '../models/note';

export function getKanbans(req, res) {
	const user = req.session.userId
	Kanban.find({$or: [{admins: user}, {users: user}]})
		.populate({
			path: 'lanes',
			// select: ['-admins', '-users'],
			populate: {
				path: 'notes',
				// select: ['-admins', '-users'],
			}
		})
		.then(docs => res.send(docs))
		.catch(err => res.send(err));
}

export function addKanban(req, res) {
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
	const {admins= req.session.userId, users= req.session.userId, remove=false, ...body} = req.body
	const update = remove ? {$set: {...body}, $pull: {users}} : {$set: {...body}, $addToSet: {admins, users}};
	Kanban.findOneAndUpdate(
		{$and: [{_id: req.params.id}, {admins: req.session.userId}]},
		update,
	)
		.populate('lanes')
		.then(kanban => {
				if(!kanban) throw Error('kanban not found // you have no credentials to modify');
				const notes = [];
				kanban.lanes.forEach(lane => notes.push(...lane.notes));
				Lane.update(
					{_id: {$in: kanban.lanes}},
					{$addToSet: {admins, users}},
					{multi: true},
					(err, raw) => {
						console.log(raw)
						if(err) throw err
					},
				);
				Note.update(
					{_id: {$in: notes}},
					{$addToSet: {admins, users}},
					{multi: true},
					(err, raw) => {
						if(err) throw err
						console.log(raw)
					},
				);
				res.send('Kanban updated');
		})
		.catch(err => res.send(err));
}

export function deleteKanban(req, res) {
	Kanban.findOne({$and: [{_id: req.params.id}, {admins: req.session.userId}]})
		.populate('lanes')
		.then(kanban => {
			const notes = [];
			kanban.lanes.forEach(lane => notes.push(...lane.notes));
			// Delete reference lanes and notes
			Lane.remove({_id: {$in: kanban.lanes}})
				.catch(console.error);
			Note.remove({_id: {$in: notes}})
				.catch(console.error);
			kanban.remove(() => {
				res.status(200).send('Kanban removed');
			});
		})
		.catch(err => res.status(500).send('Wrong kanban id or lack of credentials'));
}

export function getKanban(req, res) {
	Kanban.findById(req.params.id)
		.populate({
			path: 'lanes',
			populate: {
				path: 'notes',
			}
		})
		.then(kanban => {
			kanban.isAdmin = kanban.admins.some(admin => admin == req.session.userId);
			kanban.save();
			res.send(kanban);
		})
		.catch(console.error)
}


export function addUserToProject (req, res) {
	const remove = req.query.remove
	const { kanban, user } = req.params
	const update = remove ? {$pull: {users: user}}  : {$addToSet: {users: user}}
	Kanban.findOneAndUpdate(
		{_id: kanban},
		update
	)
		.then(kanban => {
			Lane.update(
				{_id: {$in: kanban.lanes}},
				update,
				{multi: true}
			)
			Lane.find({_id: {$in: kanban.lanes}}, 'notes')
				.then(notes => console.log(notes))
				.catch(console.error)
			res.send('ok')
		})
}
