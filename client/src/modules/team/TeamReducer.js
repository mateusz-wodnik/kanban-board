import { CREATE_TEAM } from './TeamActions'

const initialState = [];

export default function notes(state= initialState, action) {
	switch (action.type) {
		case CREATE_TEAM:
			return action.team;

		default:
			return state;
	}
}
