import Note from '../models/note';
import Lane from '../models/lane';

export function getNotes(req, res) {
	console.log('Received GET request')
	Note.find((err, docs) => {
		if (err) {
			res.status(500).send(err);
		}
		res.send(docs);
	});
}

export function addNote(req, res) {
	console.log(`Received POST`)
	const { note, laneId } = req.body;

	const newNote = new Note(note);
	newNote.save((err, docs) => {
		if(err) res.status(500).send(err);
		Lane.findOne({ _id: laneId })
			.then(lane => {
				lane.notes.push(docs);
				return lane.save();
			})
			.then(() => {
				res.json(docs)
			})
	})
}

export function updateNote(req, res) {
	console.log(`Received PUT`)
	Note.update(
		{_id: req.params.id},
		req.body,
		err => res.send({_id: req.params.id})
	)
}

export function deleteNote(req, res) {
	console.log(`Received DELETE`)
	Note.remove(
		{_id: req.params.id},
		err => res.send({_id: req.params.id})
	)
}

export function getNote(req, res) {
	console.log(`Received GET for single example`)
	Note.findById(req.params.id, (err, doc) => {
		res.send(doc)
	})
}
