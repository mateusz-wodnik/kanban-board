import React from 'react';
import { Link } from 'react-router-dom';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

BigCalendar.momentLocalizer(moment);

const Calendar = ({ events, startAccessor, endAccessor, eventStyleGetter }) => (
	<section className="calendar h-100">
		<BigCalendar
			events={events}
			components={{
				event: Event
			}}
			eventPropGetter={eventStyleGetter}
		/>
	</section>
);

const Event = ({event}) => (
	<Link to={`/notes/${event.id}`} className="event">
		{event.title}
	</Link>
);

export default Calendar;

