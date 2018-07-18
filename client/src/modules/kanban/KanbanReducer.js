import { CREATE_KANBAN, UPDATE_KANBAN, DELETE_KANBAN } from './KanbanActions'
import { CREATE_LANE, DELETE_LANE } from '../lane/LaneActions'
import { USER_LOGOUT } from '../_user/UserActions'

const initialState = [];

export default function lanes(state = initialState, action) {
	switch (action.type) {
		case CREATE_KANBAN:
			return {...action.kanban, raw: action.raw};

		case UPDATE_KANBAN:
			return state.map(lane => {
				return lane.id === action.id ? {...lane, ...action.lane} : lane;
			});

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
