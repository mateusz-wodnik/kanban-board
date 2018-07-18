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
			kanbanId
		}
		return fetch('http://localhost:3000/api/lanes', {
			method: "POST",
			credentials: 'include',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		})
			.then(res => {
				if(!res.ok) throw Error('Cannot create new lane')
				return res.json()
			})
			.then(res => dispatch(createLane(res)))
			.catch(err => console.log(err))
	}
}

export function updateLane(lane) {
	return {
		type: UPDATE_LANE,
		lane,
	}
}

export function updateLaneRequest(id, lane) {
	return (dispatch) => {
		return fetch(`http://localhost:3000/api/lanes/${id}`, {
			method: "PUT",
			credentials: 'include',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(lane)
		})
		.then(() => dispatch(updateLane(id, lane)))
	}
}

export function deleteLane(laneId) {
	return {
		type: DELETE_LANE,
		laneId
	}
}

export function deleteLaneRequest(laneId) {
	return (dispatch) => {
		return fetch(`http://localhost:3000/api/lanes/${laneId}`, {
			credentials: 'include',
			method: "DELETE"
		})
			.then(() => dispatch(deleteLane(laneId)))
	}
}

export function createLanes(lanes) {
	return {
		type: CREATE_LANES,
		lanes
	};
}
