import React from 'react';
import { Link } from 'react-router-dom'
import User from './User'
import './Team.css'

const Team = ({allUsers, teamUsers, addTeamUser, removeTeamUser, kanbanId}) => (
	<section className="manage-users">
		<div className="manage-users__col manage-users__col--in list-group">
			{teamUsers.map((user, idx) => <User users={user._id} kanbanId={kanbanId} removeTeamUser={removeTeamUser} envClass='list-group-item' key={idx} firstname={user.firstname} lastname={user.lastname} username={user.username} email={user.email}/>)}
		</div>
		<div className="manage-users__col manage-users__col--out list-group">
			{allUsers.map((user, idx) => <User users={user._id} kanbanId={kanbanId} addTeamUser={addTeamUser} envClass='list-group-item' key={idx} firstname={user.firstname} lastname={user.lastname} username={user.username} email={user.email}/>)}
		</div>
	</section>
)

export default Team;
