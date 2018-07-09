import { connect } from 'react-redux';
import * as noteActions from './NoteActions';
import Note from './Note'
import { bindActionCreators } from 'redux'

const mapStateToProps = (state) => {
	return {
		edit: state.edit,
		priority: state.kanban.priority
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ ...noteActions }, dispatch);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Note);
