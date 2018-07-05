import { createNotes } from '../note/NoteActions'
import { lanes } from '../../util/schema';
import { normalize } from 'normalizr';

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

export function createLaneRequest(lane) {
	return (dispatch) => {
		const body = {
			lane,
			kanbanId: "5b3d38a01209cf202abbeb65"
		}
		return fetch('http://localhost:3000/api/lanes',
			{ method: "POST",
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
			.then(res => {
				dispatch(createLane(res))
			})
			.catch(err => console.log(err))
	}
}

export function updateLane(lane) {
	return {
		type: UPDATE_LANE,
		lane,
	}
}

export function updateLaneRequest(lane) {
	return (dispatch) => {
		return fetch(`http://localhost:3000/api/lanes/${lane._id}`,
			{ method: "PUT",
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(lane)
			})
			.then(() => dispatch(updateLane(lane)))
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
		return fetch(`http://localhost:3000/api/lanes/${laneId}`,
			{ method: "DELETE"})
			.then(() => dispatch(deleteLane(laneId)))
	}
}

export function fetchLanes() {
	return (dispatch) => {
		return fetch('http://localhost:3000/api/lanes')
			.then(res => res.json())
			.then(res => {
				let notes = []
				res.map(lane => {
					lane.notes = lane.notes.map(note => {
						notes.push(note)
						return note._id
					})
					return lane
				})
				dispatch(createNotes(notes));
				dispatch(createLanes(res));
			})
	};
}


export function createLanes(lanes) {
	return {
		type: CREATE_LANES,
		lanes
	};
}
