export const CREATE_LANE = 'CREATE_LANE';
export const CREATE_LANES = 'CREATE_LANES';
export const UPDATE_LANE = 'UPDATE_LANE';
export const DELETE_LANE = 'DELETE_LANE';


export function createLane(lane) {
	return {
		type: CREATE_LANE,
		lane: {
			notes: [],
			...lane,
		}
	}
}

export function createLaneRequest(kanbanId, lane) {
	return (dispatch) => {
		const body = {
			lane,
			kanbanId,
		}
		return fetch('http://localhost:3000/api/lanes', {
			method: "POST",
			credentials: 'include',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		})
			.then(res => {
				if(!res.ok) throw Error('Cannot create new lane');
				return res.json();
			})
			.then(res => dispatch(createLane(res)))
			.catch(console.error);
	}
}

export function updateLane(id, lane, notes) {
	return {
		type: UPDATE_LANE,
		lane,
		id,
		notes,
	}
}

export function updateLaneRequest(id, lane, notes='') {
	return (dispatch) => {
		return fetch(`http://localhost:3000/api/lanes/${id}?notes=${notes}`, {
			method: "PUT",
			credentials: 'include',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(lane),
		})
			.then(() => dispatch(updateLane(id, lane, notes)))
			.catch(console.error);
	}
}

export function deleteLane(laneId) {
	return {
		type: DELETE_LANE,
		laneId,
	}
}

export function deleteLaneRequest(laneId) {
	return (dispatch) => {
		return fetch(`http://localhost:3000/api/lanes/${laneId}`, {
			credentials: 'include',
			method: "DELETE",
		})
			.then(() => dispatch(deleteLane(laneId)))
			.catch(console.error);
	}
}

export function createLanes(lanes) {
	return {
		type: CREATE_LANES,
		lanes,
	};
}
