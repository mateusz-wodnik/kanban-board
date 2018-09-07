import React from 'react';
import { DragSource } from 'react-dnd/lib/index';

const User = ({ user, kanbanId, addTeamUser, removeTeamUser, handleDrop, isDragging, connectDragSource}) => {
	const { _id, firstname, lastname } = user
	return connectDragSource(
		<div className="user card list-group-item" style={{opacity: isDragging ? 0 : 1}}>
				<div className="card-body">
					<h5 className="card-title">{firstname} {lastname}</h5>
					<button
						onClick={() => addTeamUser ? addTeamUser(kanbanId, _id) : removeTeamUser(kanbanId, _id, true)}
						className={`btn ${addTeamUser ? 'btn-primary' : 'btn-danger'}`}
					>{addTeamUser ? 'Add' : 'Remove'}</button>
				</div>
		</div>
	);
}


// React DnD config
const type = 'user';

const spec = {
	beginDrag(props) {
		return props;
	},
	endDrag(props, monitor) {
		if(!monitor.didDrop()) return;
		const { addTeamUser, removeTeamUser, kanbanId }  = props;
		addTeamUser ? addTeamUser(kanbanId, props.user._id) : removeTeamUser(kanbanId, props.user._id, true);
	}
}

const collect = (connect, monitor) => {
	return {
		connectDragSource: connect.dragSource(),
		connectDragPreview: connect.dragPreview(),
		isDragging: monitor.isDragging(),
	}
}

export default DragSource(type, spec, collect)(User);

