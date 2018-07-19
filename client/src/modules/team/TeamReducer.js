import { CREATE_TEAM, ADD_TEAM_USER } from './TeamActions'

const initialState = [];

export default function notes(state= initialState, action) {
	switch (action.type) {
		case CREATE_TEAM:
			return action.team;

		// case ADD_TEAM_USER:
		// 	return [...state, action.user]

		default:
			return state;
	}
}
