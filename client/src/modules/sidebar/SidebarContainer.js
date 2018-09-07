import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchKanban } from '../kanban/KanbanActions';
import { userLogoutRequest } from '../_user/UserActions';
import { bindActionCreators } from 'redux';
import Sidebar from './Sidebar';

class SidebarContainer extends Component {
	render() {
		const { isAdmin,
				user,
				kanban,
				kanbans,
				fetchKanban,
				userLogoutRequest,
		} = this.props
		return (
			<Sidebar
				isAdmin={isAdmin}
				user={user}
				kanban={kanban}
				kanbans={kanbans}
				fetchKanban={fetchKanban}
				userLogoutRequest={userLogoutRequest}
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


