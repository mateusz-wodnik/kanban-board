import React from 'react';
import Lane from './LaneContainer';

const Lanes = ({ lanes, userId, isEditor }) => (
	<div className="d-flex flex-wrap">
		{lanes.map(lane => {
			return lane.active ?
				<Lane
					key={lane._id}
					lane={lane}
					edit={isEditor && lane.admins.includes(userId)}
				/> : null
		})}
	</div>
);

export default Lanes;
