import { CREATE_LANE, UPDATE_LANE, DELETE_LANE, CREATE_LANES } from './LaneActions'

import { CREATE_NOTE, DELETE_NOTE } from '../note/NoteActions'

const initialState = [];

export default function lanes(state = initialState, action) {
	switch (action.type) {
		case CREATE_LANE:
			return [...state, action.lane];

		case CREATE_LANES:
			return [...action.lanes]

		case UPDATE_LANE:
			return state.map(lane => {
				return lane.id === action.id ? {...lane, ...action.lane} : lane;
			});

		case DELETE_LANE:
			console.log('Delete')
			return state.filter(lane => lane._id !== action.laneId);

		case CREATE_NOTE:
			console.log(action)
			return state.map(lane => {
				if(lane._id === action.laneId) {
					const notes = [...lane.notes, action.note._id];
					return {...lane, notes};
				}
				return lane;
			});

		case DELETE_NOTE:
			return state.map(lane => {
				if(lane._id === action.laneId) {
					const notes = lane.notes.filter(note => note !== action.noteId)
					return {...lane, notes}
				}
				return lane
			})

		default:
			return state;
	}
}
