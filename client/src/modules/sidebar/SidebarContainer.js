import React, { Component } from 'react';
import { createLaneRequest } from '../lane/LaneActions';
import { connect } from 'react-redux';
import { fetchKanban } from '../kanban/KanbanActions';
import { userLogoutRequest } from '../_user/UserActions';
import { bindActionCreators } from 'redux';
import Sidebar from './Sidebar';

class SidebarContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isAddVisible: false,
		}
		console.log(props)
	}

	render() {
		const { isAddVisible } = this.state;
		console.log(this.props)
		return (
			<Sidebar
				props={this.props}
				isAdmin={this.props.isAdmin}
				user={this.props.user}
				kanban={this.props.kanban}
				kanbans={this.props.kanbans}
				fetchKanban={this.props.fetchKanban}
				userLogoutRequest={this.props.userLogoutRequest}
			/>
		);
	}
}

const mapStateToProps = state => ({
	kanbans: state.user.kanbans || [],
	kanban: state.kanban,
	user: state.user,
});

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ fetchKanban, userLogoutRequest }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarContainer);


