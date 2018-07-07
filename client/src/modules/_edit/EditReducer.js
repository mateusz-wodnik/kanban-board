import { EDIT_START } from './EditActions'

const initialState = false;

export default function lanes(state = initialState, action) {
	switch (action.type) {
		case EDIT_START:
			return action.edit
		default:
			return state
	}
}
