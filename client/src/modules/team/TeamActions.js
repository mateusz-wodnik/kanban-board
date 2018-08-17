export const CREATE_TEAM = 'CREATE_TEAM';
export const ADD_TEAM_USER = 'ADD_TEAM_USER';
export const REMOVE_TEAM_USER = 'REMOVE_TEAM_USER';

export function createTeamRequest () {
	return (dispatch) => {
		return fetch('/api/users', {
			credentials: 'include',
		})
			.then(res => res.json())
			.then(res => dispatch(createTeam(res)))
			.catch(() => console.error("You're not logged in"));
	}
}

export function createTeam(team) {
	return {
		type: CREATE_TEAM,
		team,
	}
}

export function addTeamUser(user) {
	return {
		type: ADD_TEAM_USER,
		user,
	}
}

export function removeTeamUser(user) {
	return {
		type: REMOVE_TEAM_USER,
		user,
	}
}

export function moveTeamUserRequest (kanban, user, remove=false) {
	return (dispatch) => {
		fetch(`/api/kanbans/${kanban}/${user}${remove ? '?remove=true' : ''}`, {
			method: "PUT",
			credentials: 'include'
		})
			.then(res => res.json())
			.then(res => {
				console.log(res)
				remove ? dispatch(removeTeamUser(user)) : dispatch(addTeamUser(user))
			})
			.catch(console.error)
	}
}

