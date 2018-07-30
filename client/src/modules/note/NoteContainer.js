import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as noteActions from './NoteActions';
import Note from './Note';
import { bindActionCreators } from 'redux';
import { updateLaneRequest } from '../lane/LaneActions';


class NoteContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isEditable: false,
			progress: 0,
			hours: '',
		}
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

	componentDidMount() {
		const note = this.props.note;
		this.handleDate(note.creationDate, note.dueDate);
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

	handleTaken = () => {
		this.props.takeTask(this.props.note._id, {taken: this.props.user._id});
	}

	render() {
		const {
			note,
			laneId,
			deleteNoteRequest,
			priority,
			isAdmin,
			team,
			updateLaneRequest,
		} = this.props;
		const { isEditable, progress, hours } = this.state;
		return (
			<Note
				note={note}
				laneId={laneId}
				deleteNoteRequest={deleteNoteRequest}
				priority={priority}
				isAdmin={isAdmin}
				team={team}
				isEditable={isEditable}
				progress={progress}
				hours={hours}
				updateLaneRequest={updateLaneRequest}
			/>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		team: state.team,
		user: state.user,
		edit: state.edit,
		priority: state.kanban.priority,
		isAdmin: state.kanban.admins ? state.kanban.admins.includes(state.user._id) : false,
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ ...noteActions, updateLaneRequest }, dispatch);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(NoteContainer);
