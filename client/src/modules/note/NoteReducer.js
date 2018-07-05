import { CREATE_NOTE, CREATE_NOTES, UPDATE_NOTE, DELETE_NOTE } from './NoteActions'
import { DELETE_LANE } from '../lane/LaneActions'

const initialState = [];

export default function notes(state= initialState, action) {
	switch (action.type) {
		case CREATE_NOTE:
			return [...state, action.note];

		case CREATE_NOTES:
			return action.notes

		case UPDATE_NOTE:
			console.log(action)
			return state.map(note => {
				return note._id === action._id ? {...note, ...action.note} : note;
			})

		case DELETE_NOTE:
			return state.filter(note => note.id !== action.noteId)

		case DELETE_LANE:
			console.log(action)

		default:
			return state;
	}
}
