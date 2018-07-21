import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.css';

import { hot } from 'react-hot-loader';

import Kanban from './modules/kanban/Kanban'
import Navbar from './modules/navbar/Navbar'
import Sidebar from './modules/sidebar/Sidebar'
import BoardEditor from './modules/boardEditor/BoardEditor'

import { userAuth, userGet } from './modules/_user/UserActions'
import AnalyticsContainer from './modules/analytics/AnalyticsContainer'
import Auth from './modules/auth/Auth'
import { createTeamRequest } from './modules/team/TeamActions'
import TeamContainer from './modules/team/TeamContainer'

class App extends Component {
	componentDidMount() {
		console.log('mounted')
		console.log('elo')
		this.props.userGet()
		this.props.createTeamRequest()
	}

	isUserLogged = (component) => (
		Object.keys(this.props.user).length ? component : Auth
	)

	render() {
		const {isLogged, isAdmin, user} = this.props
		return (
			<div className="app container-fluid p-0">
				<input id="toggleSidebar" className="btn btn-primary" type="checkbox" />
				<Navbar />
				<Sidebar isAdmin={isAdmin}/>
				<div className="content">
					<Route exact path='/' component={this.isUserLogged(Kanban)}/>
					<Route path='/board' component={this.isUserLogged(Kanban)}/>
					<Route path='/board-editor' component={this.isUserLogged(Kanban)}/>
					<Route path='/create-board' component={this.isUserLogged(BoardEditor)}/>
					<Route path='/analytics' component={this.isUserLogged(AnalyticsContainer)}/>
					<Route path='/team' component={this.isUserLogged(TeamContainer)}/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	isLogged: Object.keys(state.user).length,
	isAdmin: state.kanban.admins ? state.kanban.admins.includes(state.user._id) : false,
	user: state.user
})

const mapDispatchToProps = {
	userAuth,
	userGet,
	createTeamRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(hot(module)(App));
