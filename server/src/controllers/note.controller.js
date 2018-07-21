import Note from '../models/note';
import Lane from '../models/lane';

export function getNotes(req, res) {
	console.log('Received GET request')
	Note.find(
		{$or: [{admins: req.session.userId}, {users: req.session.userId}]},
		(err, docs) => {
			if (err) {
				res.status(500).send(err);
			}
			res.send(docs);
		}
	);
}


export function addNote(req, res) {
	console.log(`Received POST`)
	const { note, laneId } = req.body;
	console.log(note, laneId, req.session.userId)
	Lane.findOne(
		{$and: [{_id: laneId}, {admins: req.session.userId}]},
		(err, lane) => {
			note.admins = req.session.userId
			const newNote = new Note(note);
			newNote.save((err, note) => {
				console.log(lane)
				if (err) return res.status(500).send(err);
				lane.notes.push(note)
				lane.save((err, lane) => {
					if (err) return res.status(500).send(err);
					res.send(note)
				})
			})
		}
	)
}

export function updateNote(req, res) {
	console.log(`Received PUT`)
	Note.update(
		{$and: [{_id: req.params.id}, {admins: req.session.userId}]},
		req.body,
		err => res.send(err || {_id: req.params.id})
	)
}

export function takeTask(req, res) {
	console.log(`Received PUT`)
	const taken = req.body
	console.log(req.body)
	Note.update(
		{$and: [{_id: req.params.id}, {$or: [{users: req.session.userId},{admins: req.session.userId}]}]},
		taken,
		err => res.send(err || {_id: req.params.id})
	)
}

export function deleteNote(req, res) {
	console.log(`Received DELETE`)
	Note.findOne(
		{$and: [{_id: req.params.id}, {admins: req.session.userId}]},
		(err, note) => {
			if(err || !note) return res.status(500).send(err ? err : 'Note not found');
			note.remove();
			res.status(200).end()
		}
	);
}

export function getNote(req, res) {
	console.log(`Received GET for single example`)
	Note.findOne(
		{$and: [{_id: req.params.id}, {$or: [{admins: req.session.userId}, {users: req.session.userId}]}]},
		(err, doc) => {
			res.send(doc)
		}
	)
}
