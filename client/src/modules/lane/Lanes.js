import React from 'react';
import Lane from './LaneContainer'

const Lanes = ({ lanes, userId, isEditor }) => {
	return (
		<div className="container-fluid d-flex p-0 flex-wrap">
			{lanes.map(lane => {
				return lane.active ?
					<Lane
						key={lane._id}
						lane={lane}
						edit={isEditor && lane.admins.includes(userId)}
					/> : null
			})}
		</div>
	)
}

export default Lanes
