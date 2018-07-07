export const CREATE_NOTE = 'CREATE_NOTE';
export const CREATE_NOTES = 'CREATE_NOTES';
export const UPDATE_NOTE = 'UPDATE_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';

export function createNote(laneId, note) {
	return {
		type: CREATE_NOTE,
		laneId,
		note
	}
}

export function createNoteRequest(laneId, note) {
	return (dispatch) => {
		const body = {
			note,
			laneId
		}
		return fetch(`http://localhost:3000/api/notes`, {
			method: "POST",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		})
			.then(res => {
				if(!res.ok) throw Error('Cannot create new note')
				return res.json()
			})
			.then(res => dispatch(createNote(laneId, res)))
			.catch(err => console.log(err))
	}
}

export function createNotes(notes) {
	return {
		type: CREATE_NOTES,
		notes
	}
}

export function updateNote(_id, note) {
	return {
		type: UPDATE_NOTE,
		_id,
		note
	}
}

export function updateNoteRequest(_id, note) {
	console.log(note)
	return (dispatch) => {
		return fetch(`http://localhost:3000/api/notes/${_id}`, {
			method: "PUT",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(note)
		})
			.then(res => dispatch(updateNote(_id, note)))
	}
}

export function deleteNote(noteId, laneId) {
	return {
		type: DELETE_NOTE,
		noteId,
		laneId
	}
}

export function deleteNoteRequest(noteId, laneId) {
	return (dispatch) => {
		return fetch(`http://localhost:3000/api/notes/${noteId}`, {
			method: "DELETE"
		})
			.then(res => dispatch(deleteNote(noteId, laneId)))
	}
}
