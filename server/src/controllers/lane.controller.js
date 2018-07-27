import Lane from '../models/lane';
import Kanban from '../models/kanban';
import User from '../models/user';

export function getLanes(req, res) {
	console.log('Received GET request')
	Lane.find({$or: [{admins: req.session.userId}, {users: req.session.userId}]},
		(err, docs) => {
			if (err) res.status(500).send(err);
			res.send(docs);
		}
	);
}

export function addLane(req, res) {
	console.log(`Received POST`);
	const { lane, kanbanId } = req.body;
	Kanban.findOne({$and: [{_id: kanbanId}, {admins: req.session.userId}]})
		.then(kanban => {
			if(!kanban) return res.status(500).send('No authorisation');
			const newLane = new Lane(lane);
			newLane.admins.addToSet(req.session.userId);
			newLane.save((err, lane) => {
				if(err) return res.status(500).send(err);
				kanban.lanes.addToSet(lane._id)
				kanban.save()
				res.send(lane)
			})
		})
}

export function updateLane(req, res) {
	console.log(`Received PUT`)
	const query = req.query.notes
	console.log(query)
	const { notes, ...body } = req.body
	let update = req.body
	if(query && notes) update = query === 'true' ? {$pull: {notes}} : {$addToSet: {notes}}
	console.log(update)
	Lane.update(
		{$and: [{_id: req.params.id}, {admins: req.session.userId}]},
		update,
		err => res.send(err || {_id: req.params.id})
	)
}

export function deleteLane(req, res) {
	console.log(`Received DELETE`)
	Lane.findOne(
		{$and: [{_id: req.params.id}, {admins: req.session.userId}]},
		(err, lane) => {
			if (err) return res.status(500).send(err);
			if(!lane) return res.status(500).send('Lane not found');
			lane.remove(() => res.status(200).end());
		}
	);
}

export function getLane(req, res) {
	console.log(`Received GET for single example`)
	Lane.findOne({$and: [{_id: req.params.id}, {$or: [{admins: req.session.userId}, {users: req.session.userId}]}]},
		(err, doc) => {
			res.send(doc)
		}
	)
}
