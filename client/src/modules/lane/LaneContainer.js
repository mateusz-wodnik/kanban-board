import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import Lane from './Lane'
import * as laneActions from './LaneActions';
import { createNote } from '../note/NoteActions'

const mapStateToProps = (state, ownProps) => {
	return {
		laneNotes: ownProps.lane.notes.map(noteId => state.notes.find(note => note.id === noteId))
	};
}

const mapDispathToProps = (dispatch) => {
	return bindActionCreators({addNote: createNote, ...laneActions }, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispathToProps,
)(Lane)
