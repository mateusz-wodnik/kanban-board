import { CREATE_LANE, UPDATE_LANE, DELETE_LANE, CREATE_LANES } from './LaneActions'

import { CREATE_NOTE, DELETE_NOTE } from '../note/NoteActions'

import { CREATE_KANBAN } from '../kanban/KanbanActions'
import { USER_LOGOUT } from '../_user/UserActions'

const initialState = [];

export default function lanes(state = initialState, action) {
	switch (action.type) {
		case CREATE_LANE:
			return [...state, action.lane];

		case CREATE_KANBAN:
		case CREATE_LANES:
			return action.lanes;

		case UPDATE_LANE:
			return state.map(lane => {
				// const notes = action.notes ?
				// 	lane.notes.filter(note => note !== action.lane.notes)
				// 	: [...lane.notes, action.lane.notes];
				console.log(action.lane)
				const updated = { ...lane, ...action.lane }
				return lane._id === action.id ? updated : lane;
			});

		case DELETE_LANE:
			return state.filter(lane => lane._id !== action.laneId);

		case CREATE_NOTE:
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
					const notes = lane.notes.filter(note => note !== action.noteId);
					return {...lane, notes};
				}
				return lane;
			})

		case USER_LOGOUT:
			return initialState;

		default:
			return state;
	}
}
