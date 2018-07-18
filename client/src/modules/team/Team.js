import React from 'react';
import { Link } from 'react-router-dom'
import User from '../_user/User'
import './Team.css'

const Team = ({team, addTeamUser, kanbanId}) => (
	<section className="manage-users">
		<div className="manage-users__col manage-users__col--in list-group">
			{team.map((user, idx) => <User users={user._id} kanbanId={kanbanId} addTeamUser={addTeamUser} envClass='list-group-item' key={idx} firstname={user.firstname} lastname={user.lastname} username={user.username} email={user.email}/>)}
		</div>
		<div className="manage-users__col manage-users__col--out list-group">
			{team.map((user, idx) => <User users={user._id} kanbanId={kanbanId} addTeamUser={addTeamUser} envClass='list-group-item' key={idx} firstname={user.firstname} lastname={user.lastname} username={user.username} email={user.email}/>)}
		</div>
	</section>
)

export default Team;
