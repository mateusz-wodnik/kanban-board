import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createTeam, addTeamUser, createTeamRequest, addTeamUserRequest } from './TeamActions';
import Team from './Team';

class TeamContainer extends Component {
	componentDidMount() {
		this.props.createTeamRequest()
	}

	render() {
		return(
			<Team
				team={this.props.team}
				addTeamUser={this.props.addTeamUserRequest}
				kanbanId={this.props.kanbanId}
			/>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		team: state.team,
		kanbanId: state.kanban._id
	};
}

const mapDispathToProps = (dispatch) => {
	return bindActionCreators({ addTeamUserRequest, createTeamRequest}, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispathToProps,
)(TeamContainer)
