import { connect } from 'react-redux';
import * as noteActions from './NoteActions';
import Note from './Note'
import { bindActionCreators } from 'redux'

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ ...noteActions }, dispatch);
};

export default connect(
	null,
	mapDispatchToProps,
)(Note);
