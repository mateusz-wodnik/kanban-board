import { USER_AUTH, USER_LOGOUT } from './UserActions'

const initialState = {};

export default function lanes(state = initialState, action) {
	switch (action.type) {
		case USER_AUTH:
			return action.user
		case USER_LOGOUT:
			return initialState


		default:
			return state
	}
}
