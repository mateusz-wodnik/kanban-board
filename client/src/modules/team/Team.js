import React from 'react';
import { Link } from 'react-router-dom'
import User from './User'
import './Team.css'
import { DropTarget } from 'react-dnd'

const Team = ({users, addTeamUser, removeTeamUser,kanbanId, handleDrop,
								connectDropTarget,hovered, item, indentifier, name }) => {
	return connectDropTarget(
		<div
			style={{backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"><text x="35%" y="50%" font-size="30" fill="grey">${name}</text></svg>')`}}
			className={`manage-users__col manage-users__col--${indentifier} list-group${item && !users.some(user => item.user._id === user._id) ? ' target' : ''}`}>
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
