import React, { Component } from 'react';
import { createLaneRequest } from '../lane/LaneActions';
import { connect } from 'react-redux';
import { fetchKanban } from '../kanban/KanbanActions';
import { userLogoutRequest } from '../_user/UserActions';
import { bindActionCreators } from 'redux';
import Navbar from './Navbar';

class NavbarContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			kanbans: [],
			isAddVisible: false,
		}
	}

	handleAddLane = () => {
		if(this.state.isAddVisible) {
			const name = document.querySelector('#newLaneName').value;
			this.props.addLane(this.props.kanban._id, {name});
			this.setState({isAddVisible: false});
		} else {
			this.setState({isAddVisible: true});
		}
	}

	render() {
		const {user, edit, fetchKanban, kanbans, kanban, userLogoutRequest} = this.props;
		const { isAddVisible } = this.state;
		return (
			<Navbar
				user={user}
				edit={edit}
				fetchKanban={fetchKanban}
				kanbans={kanbans}
				kanban={kanban}
				userLogoutRequest={userLogoutRequest}
				isAddVisible={isAddVisible}
				handleAddLane={this.handleAddLane}
				AddNameModal={this.AddNameModal}
			/>
		);
	}

	AddNameModal = () => (
		<input
			onKeyDown={e => {
				if(e.keyCode === 13) this.handleAddLane()
			}}
			id="newLaneName"
			type="text"
			className="form-control"
			placeholder="Lane name"
			aria-label="Lane name"
			aria-describedby="basic-addon1"
		/>
	);
}

const mapStateToProps = state => ({
	edit: state.edit,
	kanbans: state.user.kanbans || [],
	kanban: state.kanban,
	user: state.user,
});

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		addLane: createLaneRequest,
		fetchKanban,
		userLogoutRequest,
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NavbarContainer);


