import React from 'react';
import LanesChart from './charts/Lanes'
import PriorityChart from './charts/Priority'
import TimeLineChart from './charts/TimeLine'
import './Analytics.css'

const Analytics = ({ lanes, priority, date }) => (
	<section className="analytics">
		<div className="card notes-share">
				<LanesChart data={lanes}/>
				<div className="card-body">
					<h5 className="card-title">Notes share in lanes</h5>
				</div>
		</div>
		<div className="card notes-priority">
			<PriorityChart data={priority}/>
			<div className="card-body">
				<h5 className="card-title">Notes priority</h5>
			</div>
		</div>
		<div className="card notes-timeline">
			<div className="card-body">
				<h5 className="card-title">Timeline</h5>
			</div>
			<TimeLineChart data={date}/>
		</div>
	</section>
)

export default Analytics

