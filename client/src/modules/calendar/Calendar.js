import React from 'react'
import { Link } from 'react-router-dom'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './Calendar.css'

BigCalendar.momentLocalizer(moment)

const Calendar = ({events, startAccessor, endAccessor, eventStyleGetter }) => {

	return (
		<section className="calendar">
			<BigCalendar
				events={events}
				components={{
					event: Event
				}}
				eventPropGetter={eventStyleGetter}
			/>
		</section>
	)
}

export default Calendar

const Event = ({event}) => (
	<Link to={`/notes/${event.id}`} className="event">
		{console.log(event)}
		{event.title}
	</Link>
)
