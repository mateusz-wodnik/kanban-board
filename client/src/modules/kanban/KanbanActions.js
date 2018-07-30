export const CREATE_KANBAN = 'CREATE_KANBAN';
export const UPDATE_KANBAN = 'UPDATE_KANBAN';
export const DELETE_KANBAN = 'DELETE_KANBAN';


export function createKanban(raw, kanban, lanes, notes) {
	return {
		type: CREATE_KANBAN,
		kanban,
		lanes,
		notes,
		raw,
	}
}

export function createKanbanRequest(kanban) {
	return (dispatch) => {
		return fetch('/api/kanbans', {
			method: "POST",
			credentials: 'include',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(kanban),
		})
		.then(res => res.json())
		.then(res => {
			const raw = {...res};
			let lanes = [];
			let notes = [];
			res.lanes = res.lanes.map(lane => {
				lane.notes = lane.notes.map(note => {
					notes.push(note);
					return note._id;
				})
				lanes.push(lane);
				return lane._id;
			})
			dispatch(createKanban(raw, res, lanes, notes));
		})
		.catch(console.error);
	}
}

export function fetchKanban(id) {
	return (dispatch) => {
		return fetch(`/api/kanbans/${id}`, {
			credentials: 'include',
		})
			.then(res => res.json())
			.then(res => {
				const raw = {...res};
				let lanes = [];
				let notes = [];
				res.lanes = res.lanes.map(lane => {
					lane.notes = lane.notes.map(note => {
						notes.push(note);
						return note._id;
					});
					lanes.push(lane);
					return lane._id;
				});
				dispatch(createKanban(raw, res, lanes, notes));
			})
			.catch(console.error);
	};
}

export function updateKanbanRequest(kanban, kanbanId) {
	return (dispatch) => {
		return fetch(`/api/kanbans/${kanbanId}`, {
			method: "PUT",
			credentials: 'include',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(kanban),
		})
			.then(res => res.json())
			.then(res => {
				const raw = {...res};
				let lanes = [];
				let notes = [];
				res.lanes = res.lanes.map(lane => {
					lane.notes = lane.notes.map(note => {
						notes.push(note);
						return note._id;
					});
					lanes.push(lane);
					return lane._id;
				});
				dispatch(createKanban(raw, res, lanes, notes));
			})
			.catch(console.error);
	}
}

export function deleteKanban(kanbanId) {
	return {
		type: DELETE_KANBAN,
		kanbanId,
	}
}

export function deleteKanbanRequest(kanbanId) {
	return (dispatch) => {
		return fetch(`/api/kanbans/${kanbanId}`, {
			method: "DELETE"
		})
			.then(() => dispatch(deleteKanban(kanbanId)))
			.catch(console.error);
	}
}
