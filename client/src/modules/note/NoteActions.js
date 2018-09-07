import { updateLane } from '../lane/LaneActions'

export const CREATE_NOTE = 'CREATE_NOTE';
export const CREATE_NOTES = 'CREATE_NOTES';
export const UPDATE_NOTE = 'UPDATE_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';

export function createNote(laneId, note) {
	return {
		type: CREATE_NOTE,
		laneId,
		note,
	}
}

export function createNoteRequest(laneId, note) {
	return (dispatch) => {
		const body = {
			note,
			laneId,
		}
		return fetch(`/api/notes`, {
			method: "POST",
			credentials: 'include',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		})
			.then(res => {
				if(!res.ok) throw Error('Cannot create new note');
				return res.json();
			})
			.then(res => {
				dispatch(createNote(laneId, res));
			})
			.catch(console.error);
	}
}

export function createNotes(notes) {
	return {
		type: CREATE_NOTES,
		notes,
	}
}

export function updateNote(_id, note) {
	return {
		type: UPDATE_NOTE,
		_id,
		note,
	}
}

export function updateNoteRequest(_id, note) {
	return (dispatch) => {
		return fetch(`/api/notes/${_id}`, {
			method: "PUT",
			credentials: 'include',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(note),
		})
			.then(res => dispatch(updateNote(_id, note)))
			.catch(console.error);
	}
}

export function moveNoteRequest(note, target) {
	return (dispatch) => {
		return fetch(`/api/notes/move/${note}/${target}`, {
			method: "PUT",
			credentials: 'include',
		})
			.then(res=> res.json())
			.then(res => {
				res.forEach(lane => {
					dispatch(updateLane(lane._id, lane))
				})
			})
			.catch(console.error);
	}
}

export function takeTask(note, user, remove) {
	return (dispatch) => {
		return fetch(`/api/notes/task/${note}/${user}${remove ? '?remove=true' : ''}`, {
			method: "PUT",
			credentials: 'include',
		})
			.then(res => dispatch(updateNote(note, {taken: remove ? null : user})))
			.catch(console.error);
	}
}

export function deleteNote(noteId, laneId) {
	return {
		type: DELETE_NOTE,
		noteId,
		laneId,
	}
}

export function deleteNoteRequest(noteId, laneId) {
	return (dispatch) => {
		return fetch(`/api/notes/${noteId}`, {
			credentials: 'include',
			method: "DELETE",
		})
			.then(res => dispatch(deleteNote(noteId, laneId)))
			.catch(console.error);
	}
}
