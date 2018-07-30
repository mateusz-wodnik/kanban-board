import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createTeamRequest, addTeamUserRequest, removeTeamUserRequest } from './TeamActions';
import Team from './Team';

import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'

class TeamContainer extends Component {
	constructor (props) {
		super(props)
	}
	componentDidMount() {
		this.props.createTeamRequest()
	}

	render() {
		return(
			<section className="manage-users">
				<Team
					users={this.props.teamUsers}
					removeTeamUser={this.props.removeTeamUserRequest}
					kanbanId={this.props.kanbanId}
					identifier={'in'}
					name={'In project'}
				/>
				<Team
					users={this.props.notTeamUsers}
					addTeamUser={this.props.addTeamUserRequest}
					kanbanId={this.props.kanbanId}
					indentifier={'out'}
					name={'Out of project'}
				/>
			</section>
		)
	}
}

const mapStateToProps = (state) => {
	// Dynamic state instead of async
	const users = () => state.kanban.users ? {
		// return only users in team
		teamUsers: state.team.filter(user => state.kanban.users.includes(user._id)),
		// return only users not in team
		notTeamUsers: state.team.filter(user => !state.kanban.users.includes(user._id)),
	} : {
		teamUsers: [],
		notTeamUsers: [],
	}
	return {
		...users(),
		kanbanId: state.kanban._id
	};
}

const mapDispathToProps = (dispatch) => {
	return bindActionCreators({ addTeamUserRequest, removeTeamUserRequest, createTeamRequest}, dispatch);
}

export default DragDropContext(HTML5Backend)(connect(
	mapStateToProps,
	mapDispathToProps,
)(TeamContainer))
