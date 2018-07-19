import { updateKanbanRequest } from '../kanban/KanbanActions'

export const CREATE_TEAM = 'CREATE_TEAM'
export const ADD_TEAM_USER = 'ADD_TEAM_USER'
export const REMOVE_TEAM_USER = 'REMOVE_TEAM_USER'

export function createTeamRequest () {
	return (dispatch) => {
		return fetch('http://localhost:3000/api/users', {
			credentials: 'include'
		})
			.then(res => res.json())
			.then(res => dispatch(createTeam(res)))
			.catch(err => console.log(err))
	}
}

export function createTeam(team) {
	return {
		type: CREATE_TEAM,
		team
	}
}

export function addTeamUser(user) {
	return {
		type: ADD_TEAM_USER,
		user
	}
}

export function addTeamUserRequest (users, kanbanId) {
	return (dispatch) => {
		console.log(users)
		dispatch(updateKanbanRequest({users}, kanbanId))
		dispatch(addTeamUser(users))
	}
}

export function removeTeamUser(user) {
	return {
		type: REMOVE_TEAM_USER,
		user
	}
}

export function removeTeamUserRequest (users, kanbanId) {
	return (dispatch) => {
		console.log(users)
		dispatch(updateKanbanRequest({users, remove: true}, kanbanId))
		dispatch(removeTeamUser(users))
	}
}
