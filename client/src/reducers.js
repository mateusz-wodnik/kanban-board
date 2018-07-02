/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import lanes from './modules/lane/LaneReducer';
import notes from './modules/note/NoteReducer';

// Combine all reducers into one root reducer
export default combineReducers({
	lanes,
	notes
});
