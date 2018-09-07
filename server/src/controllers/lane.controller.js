import Lane from '../models/lane';
import Kanban from '../models/kanban';

export function getLanes(req, res) {
	Lane.find({$or: [{admins: req.session.userId}, {users: req.session.userId}]},
		(err, docs) => {
			if (err) res.status(500).send(err);
			res.send(docs);
		}
	);
}

export function addLane(req, res) {
	const { lane, kanbanId } = req.body;
	Kanban.findOne({$and: [{_id: kanbanId}, {admins: req.session.userId}]})
		.then(kanban => {
			if(!kanban) return res.status(500).send('No authorisation');
			const newLane = new Lane(lane);
			newLane.admins.addToSet(req.session.userId);
			newLane.save((err, lane) => {
				if(err) return res.status(500).send(err);
				kanban.lanes.addToSet(lane._id);
				kanban.save();
				res.send(lane);
			});
		});
}

export function updateLane(req, res) {
	const query = req.query.notes;
	const { notes } = req.body;
	let update = req.body;
	if(query && notes) update = query === 'true' ? {$pull: {notes}} : {$addToSet: {notes}};
	Lane.update(
		{$and: [{_id: req.params.id}, {admins: req.session.userId}]},
		update,
		(err) => {
			err ? res.send(401, err) : res.send({_id: req.params.id})
		}
	);
}

export function deleteLane(req, res) {
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
	Lane.findOne({$and: [{_id: req.params.id}, {$or: [{admins: req.session.userId}, {users: req.session.userId}]}]},
		(err, doc) => res.send(err || doc)
	);
}
