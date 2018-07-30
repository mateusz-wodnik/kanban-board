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

	handleDate = () => {
		const toHours = (diff) => Math.ceil(diff / (1000 * 3600));
		const output = this.props.notes.map(note => {
			const hours = [0, toHours(new Date(note.dueDate)) - toHours(new Date())];
			return {name: note.name, hours};
		}).sort((a, b) => a.hours[1] < b.hours[1]);
		return output;
	}

	render() {
		const { handleDate, handlePriority, handleData } = this;
		return (
			<Analytics
				lanes={handleData()}
				priority={handlePriority()}
				date={handleDate()}
			/>
		);
	}
}

const mapStateToProps = (state) => ({
	kanban: state.kanban,
	lanes: state.lanes,
	notes: state.notes,
	priorities: state.kanban.priority,
})

export default connect(mapStateToProps)(AnalyticsContainer);
