import React,{ Component } from 'react';
import { connect } from 'react-redux';
import Calendar from './Calendar'

class CalendarContainer extends Component {
	eventStyleGetter = (event) => {
		const style = {
			backgroundColor: this.props.priority[event.priority]
		};
		return {style};
	}
	render() {
		const { events, priority } = this.props
		return (
			<Calendar
				events={events}
				priotiy={priority}
				eventStyleGetter={this.eventStyleGetter}
			/>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		events: state.notes.map(note => {
			return {
				id: note._id,
				title: note.name,
				start: new Date(note.creationDate),
				end: new Date(note.dueDate),
				desc: note.task,
				priority: note.priority
			}
		}),
		priority: state.kanban.priority
	};
}

export default connect(mapStateToProps)(CalendarContainer)
