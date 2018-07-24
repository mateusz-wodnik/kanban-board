import React from 'react';
import { DragSource } from 'react-dnd/lib/index'

const User = ({ user, kanbanId, addTeamUser, removeTeamUser, handleDrop, isDragging, connectDragSource}) => {
	const { _id, firstname, lastname, username, email } = user
	return connectDragSource(
		<div className="user card list-group-item" style={{opacity: isDragging ? 0 : 1}}>
			{/*<img className="card-img-top" src=".../100px180/" alt="Card image cap" />*/}
				<div className="card-body">
					<h5 className="card-title">{firstname} {lastname}</h5>
					<button
						onClick={() => addTeamUser ? addTeamUser(_id, kanbanId) : removeTeamUser(_id, kanbanId)}
						className={`btn ${addTeamUser ? 'btn-primary' : 'btn-danger'}`}
					>{addTeamUser ? 'Add' : 'Remove'}</button>
				</div>
		</div>
	)
}

const type = 'user'

const spec = {
	beginDrag(props) {
		console.log(props)
		return props
	},
	endDrag(props, monitor, component) {
		console.log(monitor, component)
		if(!monitor.didDrop()) return
		const { addTeamUser, removeTeamUser, kanbanId }  = props
		addTeamUser ? addTeamUser(props.user._id, kanbanId) : removeTeamUser(props.user._id, kanbanId)

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

