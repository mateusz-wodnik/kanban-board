import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import Lane from './Lane';
import * as laneActions from './LaneActions';
import { createNoteRequest } from '../note/NoteActions';
import { DragDropContext } from 'react-dnd/lib/index';
import HTML5Backend from 'react-dnd-html5-backend/lib/index';
import AddNoteModal from './AddNoteModal';

class LaneContainer extends Component {
	constructor (props) {
		super(props);
		this.state = {
			isAddVisible: false,
			isEdited: false,
		}
	}

	captionEdit = (e) => {
		if(e.target.classList.contains('lane__name') || e.target.classList.contains('lane__color')) {
			this.setState({isEdited: true});
		}
	}

	handleAddNote = (e) => {
		if(this.state.isAddVisible) {
			const data = document.querySelector('#addNoteForm').elements.newNote;
			const output = {};
			data.forEach(input => output[input.id] = input.value);
			output.dueDate = output.dueDate.trim().replace(' ', 'T');
			const laneId = this.props.lane._id;
			this.props.addNote(laneId, output);
			this.setState({isAddVisible: false});
		} else {
			this.setState({isAddVisible: true});
		}
	}

	handleEditLane = (e) => {
		const lane = e.target.closest('.lane');
		const laneUpdates = lane.querySelectorAll('.editLane');
		const laneBody = {
			name: laneUpdates[0].textContent,
			color: laneUpdates[1].value,
		}
		this.props.updateLaneRequest(lane.id, laneBody);
		this.setState({isEdited: false});
	}

	handleColorChange = (e) => {
		e.target.closest('.lane').style.backgroundColor = e.target.value;
	}

	render() {
		const { lane, deleteLaneRequest, laneNotes, edit } = this.props;
		const { isEdited, isAddVisible } = this.state;
		const { handleColorChange, handleEditLane, handleAddNote, captionEdit } = this;
		const laneId = lane._id;
		return (
			<Lane
				lane={lane}
				deleteLaneRequest={deleteLaneRequest}
				laneNotes={laneNotes}
				edit={edit}
				isEdited={isEdited}
				laneId={laneId}
				AddNoteModal={AddNoteModal}
				isAddVisible={isAddVisible}
				handleColorChange={handleColorChange}
				handleEditLane={handleEditLane}
				handleAddNote={handleAddNote}
				captionEdit={captionEdit}
			/>
		);
	}
}

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
)(LaneContainer));
