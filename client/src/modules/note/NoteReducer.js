import { CREATE_NOTE, CREATE_NOTES, UPDATE_NOTE, DELETE_NOTE } from './NoteActions';
import { CREATE_KANBAN } from '../kanban/KanbanActions';
import { USER_LOGOUT } from '../_user/UserActions';

const initialState = [];

export default function notes(state= initialState, action) {
	switch (action.type) {
		case CREATE_NOTE:
			return [...state, action.note];

		case CREATE_KANBAN:
		case CREATE_NOTES:
			return action.notes;

		case UPDATE_NOTE:
			return state.map(note => {
				return note._id === action._id ? {...note, ...action.note} : note;
			})

		case DELETE_NOTE:
			return state.filter(note => note.id !== action.noteId);

		case USER_LOGOUT:
			return initialState;

		default:
			return state;
	}
}
