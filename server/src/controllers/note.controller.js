import Note from '../models/note';
import Lane from '../models/lane';

export function getNotes(req, res) {
	Note.find(
		{$or: [{admins: req.session.userId}, {users: req.session.userId}]},
		(err, docs) => {
			if(err) res.status(500).send(err);
			res.send(docs);
		}
	);
}


export function addNote(req, res) {
	const { note, laneId } = req.body;
	Lane.findOne(
		{$and: [{_id: laneId}, {admins: req.session.userId}]},
		(err, lane) => {
			note.admins = req.session.userId;
			note.users = lane.users
			const newNote = new Note(note);
			newNote.save((err, note) => {
				if (err) return res.status(500).send(err);
				lane.notes.push(note);
				lane.save((err, lane) => {
					if (err) return res.status(500).send(err);
					res.send(note);
				})
			})
		}
	)
}

export function updateNote(req, res) {
	Note.update(
		{$and: [{_id: req.params.id}, {admins: req.session.userId}]},
		req.body,
		err => res.send(err || {_id: req.params.id}),
	);
}

export function takeTask(req, res) {
	const remove = req.query.remove
	const { note, user } = req.params
	Note.update(
		{$and: [
			{_id: note},
			{$or: [
				{users: req.session.userId},
				{admins: req.session.userId}
			]}
		]},
		{taken: remove ? null : user},
		(err, raw) => {
			if(err) return res.json(401, err)
			res.send(raw)
		}
	);
}

export function moveNote(req, res) {
	const {note, target} = req.params
	Note.findOne({$and: [{_id: note}, {$or: [{admins: req.session.userId}, {taken: req.session.userId}]}]})
		.then(note => {
			Lane.find({$or: [{_id: target}, {notes: note}]})
				.then(lanes => {
					lanes.forEach(lane => {
						if(lane._id == target) {
							lane.notes.addToSet(note._id)
							lane.save()
							return
						}
						lane.notes.pull(note)
						lane.save()
					})
					res.send(lanes)
				})
				.catch(err => res.send(403, err))
		})
		.catch(console.error)
}

export function deleteNote(req, res) {
	Note.findOne(
		{$and: [{_id: req.params.id}, {admins: req.session.userId}]},
		(err, note) => {
			if(err || !note) return res.status(500).send(err ? err : 'Note not found');
			note.remove();
			res.status(200).end();
		}
	);
}

export function getNote(req, res) {
	Note.findOne(
		{$and: [{_id: req.params.id}, {$or: [{admins: req.session.userId}, {users: req.session.userId}]}]},
		(err, doc) => res.send(err || doc)
	);
}
