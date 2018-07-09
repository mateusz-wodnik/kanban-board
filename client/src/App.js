import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.css';

import Kanban from './modules/kanban/Kanban'
import Navbar from './modules/navbar/Navbar'
import Sidebar from './modules/sidebar/Sidebar'
import BoardEditor from './modules/boardEditor/BoardEditor'

import { editStart } from './modules/_edit/EditActions';
import AnalyticsContainer from './modules/analytics/AnalyticsContainer'

class App extends Component {
  render() {
		this.props.location.pathname === '/board-editor' ? this.props.editStart(true) : this.props.editStart(false)
    return (
    	<div className="app container-fluid p-0">
				<input id="toggleSidebar" className="btn btn-primary" type="checkbox" />
				<Navbar />
				<Sidebar />
				<Route path='/board' component={Kanban}/>
				<Route path='/board-editor' component={Kanban}/>
				<Route path='/create-board' component={BoardEditor}/>
				<Route path='/analytics' component={AnalyticsContainer}/>
			</div>
    );
  }
}


const mapDispatchToProps = {
	editStart
}

export default connect(null, mapDispatchToProps)(App);
