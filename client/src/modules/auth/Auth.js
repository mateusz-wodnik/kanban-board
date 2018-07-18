import React from 'react'
import Login from './Login'
import Register from './Register'
import './Auth.css'
import { userAuth, userRegister } from '../_user/UserActions'
import { connect } from 'react-redux';

class Auth extends React.Component {
	constructor (props) {
		super(props)
	}

	handleRegister = (e) =>{
		e.preventDefault()
		const {firstname, lastname, password, passwordconfirm, username, email} = e.target.form.elements
		if(password.value !== passwordconfirm.value) return
		const body = {
			firstname: firstname.value,
			lastname: lastname.value,
			username: username.value,
			password: password.value,
			email: email.value,
		}
		this.props.userRegister(body)
	}

	handleLogin = (e) => {
		e.preventDefault()
		const {email, password} = e.target.form.elements
		const body = {
			email: email.value,
			password: password.value
		}
		this.props.userAuth(body)

	}

	render() {
		return(
			<section className="register">
				<Login handleLogin={this.handleLogin}/>
				<Register handleRegister={this.handleRegister}/>
			</section>
		)
	}
}

const mapDispatchToProps = {
	userAuth,
	userRegister
}

export default connect(null, mapDispatchToProps)(Auth);
