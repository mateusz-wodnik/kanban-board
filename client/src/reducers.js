/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import lanes from './modules/lane/LaneReducer';
import notes from './modules/note/NoteReducer';
import kanban from './modules/kanban/KanbanReducer';
import edit from './modules/_edit/EditReducer';

// Combine all reducers into one root reducer
export default combineReducers({
	lanes,
	notes,
	kanban,
	edit
});
