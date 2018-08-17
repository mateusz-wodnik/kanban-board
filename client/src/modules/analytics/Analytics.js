import React from 'react';
import LanesChart from './charts/Lanes'
import PriorityChart from './charts/Priority'
import UsersChart from './charts/Users'
import './Analytics.css'

const Analytics = ({ lanes, priority, users }) => (
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
		<div className="card users-count">
			<UsersChart data={users} />
			<div className="card-body">
				<h5 className="card-title">Users in/out project</h5>
			</div>
		</div>
	</section>
)

export default Analytics

