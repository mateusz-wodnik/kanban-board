import React from 'react';
import Lane from './LaneContainer'

const Lanes = ({ lanes }) => {
	return (
		<div className="container-fluid d-flex p-0 flex-wrap">
			{lanes.map(lane => lane.active ? <Lane key={lane._id} lane={lane}/> : null)}
		</div>
	)
}

export default Lanes
