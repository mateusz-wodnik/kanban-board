import React, { Component } from 'react';
import { connect } from 'react-redux';
import Analytics from './Analytics';

class AnalyticsContainer extends Component {
	handleData = () => {
		const lanes = this.props.lanes || []
		const notes = this.props.notes || []
		const notesNumber = notes.length
		return lanes.map(lane => {
			return {
				name: lane.name,
				notes: Math.round(lane.notes.length / notesNumber * 100),
				notesNumber: lane.notes.length,
				color: lane.color,
			}
		})
	}

	handlePriority = () => {
		const out = {}
		this.props.notes.forEach(note => {
			if(out[note.priority]) {
				out[note.priority].value += 1
			} else {
				out[note.priority] = {value: 1, name: note.priority}
			}
		})
		return Object.values(out)
	}

	render() {
		return <Analytics
			lanes={this.handleData()}
			priority={this.handlePriority()}
		/>
	}
}

const data02 = [
	{name: 'Group A', value: 2400},
	{name: 'Group B', value: 4567},
	{name: 'Group C', value: 1398},
	{name: 'Group D', value: 9800},
	{name: 'Group E', value: 3908},
	{name: 'Group F', value: 4800}
];

const mapStateToProps = (state) => ({
	kanban: state.kanban,
	lanes: state.lanes,
	notes: state.notes
})

export default connect(mapStateToProps)(AnalyticsContainer)
