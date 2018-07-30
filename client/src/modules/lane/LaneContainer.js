import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import Lane from './Lane'
import * as laneActions from './LaneActions';
import { createNote, createNoteRequest } from '../note/NoteActions'
import { DragDropContext } from 'react-dnd/lib/index'
import HTML5Backend from 'react-dnd-html5-backend/lib/index'

const mapStateToProps = (state, ownProps) => {
	return {
		laneNotes: ownProps.lane.notes.map(noteId => state.notes.find(note => note._id === noteId))
	};
}

const mapDispathToProps = (dispatch) => {
	return bindActionCreators({addNote: createNoteRequest, ...laneActions }, dispatch);
}

export default DragDropContext(HTML5Backend)(connect(
	mapStateToProps,
	mapDispathToProps,
)(Lane))
