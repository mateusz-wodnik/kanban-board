import React from 'react';
import { Link } from 'react-router-dom'
import User from './User'
import './Team.css'
import { DropTarget } from 'react-dnd'

const Team = ({users, addTeamUser, removeTeamUser,kanbanId, handleDrop,
								connectDropTarget,hovered, item }) => {
	return connectDropTarget(
		<div className={`manage-users__col manage-users__col--in list-group${item && !users.some(user => item.user._id === user._id) ? ' target' : ''}`}>
			{users.map((user, idx) =>
				<User user={user}
							kanbanId={kanbanId}
							addTeamUser={addTeamUser}
							removeTeamUser={removeTeamUser}
							key={idx}
							handleDrop={handleDrop}
				/>
			)}
		</div>
	)
}

const collect = (connect, monitor) => {
	return {
		connectDropTarget: connect.dropTarget(),
		hovered: monitor.isOver(),
		item: monitor.getItem()
	}
}

const spec = {
	canDrop(props, monitor) {
		return !props.users.some(user => monitor.getItem().user._id === user._id)
	}
}


export default DropTarget('user', spec, collect)(Team);
