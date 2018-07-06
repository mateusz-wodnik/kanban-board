import { createNotes } from '../note/NoteActions'
import { createLanes } from '../lane/LaneActions'

export const CREATE_KANBAN = 'CREATE_KANBAN';
export const CREATE_KANBANS = 'CREATE_KANBANS';
export const UPDATE_KANBAN = 'UPDATE_KANBAN';
export const DELETE_KANBAN = 'DELETE_KANBAN';


export function createKanban(kanban, lanes, notes) {
	return {
		type: CREATE_KANBAN,
		kanban,
		lanes,
		notes
	}
}

export function createKanbanRequest(kanban) {
	return (dispatch) => {
		return fetch('http://localhost:3000/api/kanbans',
			{ method: "POST",
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(kanban)
			})
			.then(res => {
				if(!res.ok) throw Error('Cannot create new kanban')
				return res.json()
			})
			.then(res => {
				dispatch(createKanban(res))
			})
			.catch(err => console.log(err))
	}
}

export function fetchKanban(id) {
	return (dispatch) => {
		return fetch(`http://localhost:3000/api/kanbans/${id}`)
			.then(res => res.json())
			.then(res => {
				let lanes = []
				let notes = []
					res.lanes = res.lanes.map(lane => {
						lane.notes = lane.notes.map(note => {
							notes.push(note)
							return note._id
						})
						lanes.push(lane)
						return lane._id
					})
				dispatch(createKanban(res, lanes, notes));
			})
	};
}

export function getKanbansRequest() {
	return (dispatch) => {
		return fetch(`http://localhost:3000/api/kanbans`)
			.then(res => res.json())
			.then(res => {
				console.log(res)
			})
	}
}

export function updateKanban(kanban) {
	return {
		type: UPDATE_KANBAN,
		kanban,
	}
}

export function updateKanbanRequest(kanban) {
	return (dispatch) => {
		return fetch(`http://localhost:3000/api/kanbans/${kanban._id}`,
			{ method: "PUT",
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(kanban)
			})
			.then(() => dispatch(updateKanban(kanban)))
	}
}

export function deleteKanban(kanbanId) {
	return {
		type: DELETE_KANBAN,
		kanbanId
	}
}

export function deleteKanbanRequest(kanbanId) {
	return (dispatch) => {
		return fetch(`http://localhost:3000/api/kanbans/${kanbanId}`,
			{ method: "DELETE"})
			.then(() => dispatch(deleteKanban(kanbanId)))
	}
}



export function createKanbans(kanbans) {
	return {
		type: CREATE_KANBANS,
		kanbans
	};
}
