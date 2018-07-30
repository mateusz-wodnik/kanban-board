import { CREATE_KANBAN, UPDATE_KANBAN, DELETE_KANBAN } from './KanbanActions'
import { CREATE_LANE, DELETE_LANE } from '../lane/LaneActions'
import { USER_LOGOUT } from '../_user/UserActions'
import { ADD_TEAM_USER, REMOVE_TEAM_USER } from '../team/TeamActions'

const initialState = [];

export default function lanes(state = initialState, action) {
	switch (action.type) {
		case CREATE_KANBAN:
			return {...action.kanban, raw: action.raw};

		case UPDATE_KANBAN:
			return {...state, ...action.kanban};

		case ADD_TEAM_USER:
			return {...state, users: [...state.users, action.user]}

		case REMOVE_TEAM_USER:
			return {...state, users: state.users.filter(user => user !== action.user)}

		case DELETE_KANBAN:
			return state.filter(lane => lane._id !== action.laneId);

		case CREATE_LANE:
			return {...state, lanes: [...state.lanes, action.lane._id]}

		case DELETE_LANE:
			return {...state, lanes: state.lanes.filter(lane => lane !== action.laneId)}

		case USER_LOGOUT:
			return initialState

		default:
			return state;
	}
}
