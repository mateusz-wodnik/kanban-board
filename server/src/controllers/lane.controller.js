import Lane from '../models/lane';
import Kanban from '../models/kanban';
import Note from '../models/note'

export function getLanes(req, res) {
	console.log('Received GET request')
	Lane.find((err, docs) => {
		if (err) {
			res.status(500).send(err);
		}
		res.send(docs);
	});
}

export function addLane(req, res) {
	console.log(`Received POST`)
	const { lane, kanbanId } = req.body;

	const newLane = new Lane(lane);
	newLane.save((err, docs) => {
		console.log(docs)
		if(err) res.status(500).send(err);
		Kanban.findOne({ _id: kanbanId })
			.then(kanban => {
				kanban.lanes.push(docs)
				return kanban.save()
			})
			.then(() => {
				res.json(docs)
			})
	})
}

export function updateLane(req, res) {
	console.log(`Received PUT`)
	Lane.update(
		{_id: req.params.id},
		req.body,
		err => res.send({_id: req.params.id})
	)
}

export function deleteLane(req, res) {
	console.log(`Received DELETE`)
	Lane.findOne({ _id: req.params.id }, (err, lane) => {
		if (err) {
			res.status(500).send(err);
		}

		lane.remove(() => {
			res.status(200).end();
		});
	});
}

export function getLane(req, res) {
	console.log(`Received GET for single example`)
	Lane.findById(req.params.id, (err, doc) => {
		res.send(doc)
	})
}
