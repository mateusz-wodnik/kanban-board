import { USER_AUTH, USER_LOGOUT } from './UserActions';
import { CREATE_KANBAN } from '../kanban/KanbanActions'

const initialState = {};

export default function lanes(state = initialState, action) {
	switch (action.type) {
		case USER_AUTH:
			return action.user;
		case USER_LOGOUT:
			return initialState;
		case CREATE_KANBAN:
			if(state.kanbans.some(kanban => kanban._id === action.kanban._id)) return state;
			const kanbans = [...state.kanbans, {name: action.kanban.name, _id: action.kanban._id}];
			return {...state.user, kanbans}
		default:
			return state;
	}
}
