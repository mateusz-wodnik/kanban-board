import { fetchKanban } from '../kanban/KanbanActions'

export const USER_AUTH = 'USER_AUTH'
export const USER_LOGOUT = 'USER_LOGOUT'

export function userGet () {
	return (dispatch) => {
		return fetch('http://localhost:3000/api/users/user', {credentials: 'include'})
			.then(res => res.json())
			.then(res => {
				if(!res) throw Error('User data not found')
				dispatch(fetchKanban(res.kanbans[0]._id))
				dispatch(userState(res))
			})
			.catch(err => console.log(err))
	}
}

export function userAuth(body) {
	return (dispatch) => {
		return fetch('http://localhost:3000/api/users/login', {
			method: "POST",
			credentials: 'include',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		})
			.then(res => res.json())
			.then(res => {
				console.log(res)
				dispatch(fetchKanban(res.kanbans[0]._id))
				dispatch(userState(res))
			})
			.catch(err => console.log(err))
	}
}

export function userLogoutRequest() {
	return (dispatch) => {
		return fetch('http://localhost:3000/api/users/logout', {
			credentials: 'include',
		})
			.then(res => dispatch(userLogout()))
			.catch(err => console.log(err))
	}
}

export function userLogout() {
	return {
		type: USER_LOGOUT
	}
}

export function userRegister(body) {
	return (dispatch) => {
		return fetch('http://localhost:3000/api/users/register', {
			method: "POST",
			credentials: 'include',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		})
			.then(res => res.json())
			.then(res => {
				dispatch(userState(res))

			})
			.catch(err => console.log(err))
	}
}

export function userState(user) {
	return {
		type: USER_AUTH,
		user
	}
}
