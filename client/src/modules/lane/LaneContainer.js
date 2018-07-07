import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import Lane from './Lane'
import * as laneActions from './LaneActions';
import { createNote, createNoteRequest } from '../note/NoteActions'

const mapStateToProps = (state, ownProps) => {
	return {
		edit: state.edit,
		laneNotes: ownProps.lane.notes.map(noteId => state.notes.find(note => note._id === noteId))
	};
}

const mapDispathToProps = (dispatch) => {
	return bindActionCreators({addNote: createNoteRequest, ...laneActions }, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispathToProps,
)(Lane)
