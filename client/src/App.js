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

class App extends Component {
	componentDidMount() {
		console.log('mounted')
		console.log('elo')
		this.props.userGet()
	}

	isUserLogged = (component) => (
		Object.keys(this.props.user).length ? component : Auth
	)

	render() {
		return (
			<div className="app container-fluid p-0">
				<input id="toggleSidebar" className="btn btn-primary" type="checkbox" />
				<Navbar />
				<Sidebar />
				<div className="content">
					<Route exact path='/' component={this.isUserLogged(Kanban)}/>
					<Route path='/board' component={this.isUserLogged(Kanban)}/>
					<Route path='/board-editor' component={this.isUserLogged(Kanban)}/>
					<Route path='/create-board' component={this.isUserLogged(BoardEditor)}/>
					<Route path='/analytics' component={this.isUserLogged(AnalyticsContainer)}/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	user: state.user
})

const mapDispatchToProps = {
	userAuth,
	userGet
}

export default connect(mapStateToProps, mapDispatchToProps)(hot(module)(App));
