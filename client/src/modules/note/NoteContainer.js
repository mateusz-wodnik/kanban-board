import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as noteActions from './NoteActions';
import Note from './Note';
import { bindActionCreators } from 'redux';
import { updateLaneRequest } from '../lane/LaneActions';


class NoteContainer extends Component {
	state = {
		isEditable: false,
		progress: 0,
		hours: '',
	}

	handleUpdate = (e) => {
		e.target.classList.toggle('check');
		const items = [...e.target.closest('.note').querySelector('.card-body').children];
		items.forEach(item => {
			item.contentEditable = true;
			item.classList.add('edit');
		});
		if(this.state.isEditable) {
			const values = items.map(item => item.innerText);
			this.props.updateNoteRequest(this.props.note._id, {name: values[0], task: values[1]});
			this.setState({isEditable: false});
			return items.forEach(item => {
				item.contentEditable = false;
				item.classList.remove('edit');
			});
		}
		this.setState({isEditable: true});
	}

	handleDate = (start, end) => {
		const startDate = new Date(start);
		const endDate = new Date(end);
		const timeDiff = Math.abs(endDate - startDate);
		const timeLeft = Math.abs(new Date() - startDate)
		const toHours = (diff) => Math.ceil(diff / (1000 * 3600));
		const format = (hours) => hours > 24 ? `${Math.ceil(hours / 24)} days left` : `${Math.ceil(hours)} hours left`;
		this.setState({
			progress: toHours(timeLeft) / toHours(timeDiff) * 100,
			hours: format(toHours(endDate - new Date())),
		});
	}

	handleTakeTask = (remove) => {
		this.props.takeTask(this.props.note._id, this.props.user, remove);
	}

	componentDidMount() {
		const note = this.props.note;
		this.handleDate(note.creationDate, note.dueDate);
	}

	render() {
		const {
			user,
			note,
			laneId,
			deleteNoteRequest,
			priority,
			isAdmin,
			team,
			updateLaneRequest,
		} = this.props;
		const { isEditable, progress, hours } = this.state;
		const { handleUpdate, handleTakeTask } = this;
		return (
			<Note
				user={user}
				isEditable={isEditable}
				progress={progress}
				hours={hours}
				note={note}
				laneId={laneId}
				priority={priority}
				isAdmin={isAdmin}
				team={team}
				updateLaneRequest={updateLaneRequest}
				deleteNoteRequest={deleteNoteRequest}
				handleUpdate={handleUpdate}
				handleTaken={handleTakeTask}
			/>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		team: state.team,
		user: state.user._id,
		edit: state.edit,
		priority: state.kanban.priority,
		isAdmin: ownProps.note.admins.includes(state.user._id)
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ ...noteActions, updateLaneRequest }, dispatch);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(NoteContainer);
