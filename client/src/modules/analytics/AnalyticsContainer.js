import React, { Component } from 'react';
import { connect } from 'react-redux';
import Analytics from './Analytics';

class AnalyticsContainer extends Component {
	handleData = () => {
		const lanes = this.props.lanes || [];
		const notes = this.props.notes || [];
		const notesNumber = notes.length;
		return lanes.map(lane => {
			return {
				name: lane.name,
				notes: Math.round(lane.notes.length / notesNumber * 100),
				notesNumber: lane.notes.length,
				color: lane.color,
			}
		});
	}

	handlePriority = () => {
		const out = {};
		this.props.notes.forEach(note => {
			if(out[note.priority]) {
				out[note.priority].notes += 1;
			} else {
				out[note.priority] = {notes: 1, name: note.priority, color: this.props.priorities[note.priority]};
			}
		});
		return Object.values(out);
	}

	handleUsers = () => {
		const team = this.props.team || [];
		const kanban = this.props.kanban.users || []
		const inProject = [];
		const outProject = [];
		team.forEach(user => {
			if(kanban.includes(user._id)) return inProject.push(user._id)
			outProject.push(user._id)
		})
		return([
			{name: 'In project', value: inProject.length},
			{name: 'Out of project', value: outProject.length}
		])
	}

	render() {
		const { handlePriority, handleData, handleUsers } = this;
		return (
			<Analytics
				lanes={handleData()}
				priority={handlePriority()}
				users={handleUsers()}
			/>
		);
	}
}

const mapStateToProps = (state) => ({
	kanban: state.kanban,
	lanes: state.lanes,
	notes: state.notes,
	team: state.team,
	priorities: state.kanban.priority,
})

export default connect(mapStateToProps)(AnalyticsContainer);
