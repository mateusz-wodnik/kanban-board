import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

import { hot } from 'react-hot-loader';

import Kanban from './modules/kanban/Kanban';
import NavbarContainer from './modules/navbar/NavbarContainer';
import Sidebar from './modules/sidebar/Sidebar';
import AnalyticsContainer from './modules/analytics/AnalyticsContainer';
import Auth from './modules/auth/Auth';
import TeamContainer from './modules/team/TeamContainer';
import CalendarContainer from './modules/calendar/CalendarContainer';
import BoardEditorContainer from './modules/boardEditor/BoardEditorContainer';

import { userAuth, userGet } from './modules/_user/UserActions';
import { createTeamRequest } from './modules/team/TeamActions';

class App extends Component {
	componentDidMount() {
		this.props.userGet();
		this.props.createTeamRequest();
	}

	isUserLogged = (component) => Object.keys(this.props.user).length ? component : Auth;

	render() {
		const { isAdmin } = this.props;
		return (
			<div className="app container-fluid p-0">
				<NavbarContainer />
				<Sidebar isAdmin={isAdmin}/>
				<div className="content">
					<Route exact path='/' component={this.isUserLogged(Kanban)}/>
					<Route path='/board' component={this.isUserLogged(Kanban)}/>
					<Route path='/board-editor' component={this.isUserLogged(Kanban)}/>
					<Route path='/create-board' component={this.isUserLogged(BoardEditorContainer)}/>
					<Route path='/analytics' component={this.isUserLogged(AnalyticsContainer)}/>
					<Route path='/calendar' component={this.isUserLogged(CalendarContainer)}/>
					<Route path='/team' component={this.isUserLogged(TeamContainer)}/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	isLogged: Object.keys(state.user).length,
	isAdmin: state.kanban.admins ? state.kanban.admins.includes(state.user._id) : false,
	user: state.user,
});

const mapDispatchToProps = {
	userAuth,
	userGet,
	createTeamRequest,
}

export default connect(mapStateToProps, mapDispatchToProps)(hot(module)(App));
