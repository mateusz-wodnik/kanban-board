import React from 'react';

const User = ({users, firstname, lastname, username, email, envClass, addTeamUser, kanbanId}) => (
	<div className={`user card ${envClass}`}>
		{/*<img className="card-img-top" src=".../100px180/" alt="Card image cap" />*/}
			<div className="card-body">
				<h5 className="card-title">{firstname} {lastname}</h5>
				<button onClick={() => addTeamUser(users, kanbanId)} className="btn btn-primary">Add</button>
			</div>
	</div>
)

export default User
