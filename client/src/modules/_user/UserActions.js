import { fetchKanban } from '../kanban/KanbanActions';

export const USER_AUTH = 'USER_AUTH';
export const USER_LOGOUT = 'USER_LOGOUT';

export function userGet () {
	return (dispatch) => {
		return fetch('/api/users/user', {
			credentials: 'include',
		})
			.then(res => res.json())
			.then(res => {
				if(!res) throw Error('User data not found');
				if(res.kanbans.length) dispatch(fetchKanban(res.kanbans[0]._id));
				dispatch(userState(res));
			})
			.catch(() => console.error("You're not logged in"));
	}
}

export function userAuth(body) {
	return (dispatch) => {
		return fetch('/api/users/login', {
			method: "POST",
			credentials: 'include',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		})
			.then(res => res.json())
			.then(res => {
				if(res.kanbans.length) dispatch(fetchKanban(res.kanbans[0]._id));
				dispatch(userState(res));
			})
			.catch(() => console.error("Couldn't log in"));
	}
}

export function userLogoutRequest() {
	return (dispatch) => {
		return fetch('/api/users/logout', {
			credentials: 'include',
		})
			.then(res => dispatch(userLogout()))
			.catch(console.error);
	}
}

export function userLogout() {
	return {
		type: USER_LOGOUT,
	}
}

export function userRegister(body) {
	return (dispatch) => {
		return fetch('/api/users/register', {
			method: "POST",
			credentials: 'include',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		})
			.then(res => res.json())
			.then(res => {
				if(res.errors) throw res.message
				dispatch(userState(res));
			})
			.catch(console.error);
	}
}

export function userState(user) {
	return {
		type: USER_AUTH,
		user
	}
}
