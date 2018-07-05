import React from 'react';
import Lane from './LaneContainer'

const Lanes = ({ lanes }) => {
	return (
		<div className="container-fluid d-flex p-0 flex-wrap">
			{lanes.map(lane => <Lane key={lane._id} lane={lane}/>)}
		</div>
	)
}

export default Lanes
