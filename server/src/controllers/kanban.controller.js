import Kanban from '../models/kanban';
import Lane from '../models/lane'

export function getKanbans(req, res) {
	console.log('Received GET request')
	Kanban.find((err, docs) => {
		if (err) {
			res.status(500).send(err);
		}
		res.send(docs);
	});
}

export function addKanban(req, res) {
	console.log(`Received POST`)
	console.log(req.body)
	const newKanban = new Kanban(req.body.kanban);
	const newLanes = req.body.lanes.map(lane => {
		const newLane = new Lane(lane)
		newKanban.lanes.push(newLane)
		return newLane
	})
	newKanban.save((err, docs) => {
		if(err) res.status(500).send(err);
		Lane.collection.insert(newLanes)
		res.send(docs)
	})
}

export function updateKanban(req, res) {
	console.log(`Received PUT`)
	Kanban.update(
		{_id: req.params.id},
		req.body,
		err => res.send({_id: req.params.id})
	)
}

export function deleteKanban(req, res) {
	console.log(`Received DELETE`)
	Kanban.findOne({ _id: req.params.id }, (err, kanban) => {
		if (err) {
			res.status(500).send(err);
		}

		// Delete reference lanes
		kanban.lanes.forEach(lane => lane.remove());

		kanban.remove(() => {
			res.status(200).end();
		});
	});
}

export function getKanban(req, res) {
	console.log(`Received GET for single example`)
	Kanban.findById(req.params.id, (err, doc) => {
		res.send(doc)
	})
}
