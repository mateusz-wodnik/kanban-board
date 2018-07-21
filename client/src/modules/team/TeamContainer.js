import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createTeamRequest, addTeamUserRequest, removeTeamUserRequest } from './TeamActions';
import Team from './Team';

class TeamContainer extends Component {
	componentDidMount() {
		this.props.createTeamRequest()
	}

	render() {
		return(
			<Team
				teamUsers={this.props.teamUsers}
				allUsers={this.props.allUsers}
				addTeamUser={this.props.addTeamUserRequest}
				removeTeamUser={this.props.removeTeamUserRequest}
				kanbanId={this.props.kanbanId}
			/>
		)
	}
}

const mapStateToProps = (state) => {
	// Dynamic state instead of async
	const users = () => state.kanban.users ? {
		// return only users in team
		teamUsers: state.team.filter(user => state.kanban.users.includes(user._id)),
		// return only users not in team
		allUsers: state.team.filter(user => !state.kanban.users.includes(user._id)),
	} : {
		teamUsers: [],
		allUsers: [],
	}
	return {
		...users(),
		kanbanId: state.kanban._id
	};
}

const mapDispathToProps = (dispatch) => {
	return bindActionCreators({ addTeamUserRequest, removeTeamUserRequest, createTeamRequest}, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispathToProps,
)(TeamContainer)
