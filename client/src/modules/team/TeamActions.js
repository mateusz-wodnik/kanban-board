import { updateKanbanRequest } from '../kanban/KanbanActions';

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

export function addTeamUserRequest (kanban, user) {
	return (dispatch) => {
		fetch(`/api/kanbans/${kanban}/${user}`)
			.then(res => {
				console.log(res)
				dispatch(addTeamUser(user))
			})
			.catch(console.error)
	}
}

export function removeTeamUser(user) {
	return {
		type: REMOVE_TEAM_USER,
		user,
	}
}

export function removeTeamUserRequest (users, kanbanId) {
	return (dispatch) => {
		dispatch(updateKanbanRequest({users, remove: true}, kanbanId));
		dispatch(removeTeamUser(users));
	}
}
