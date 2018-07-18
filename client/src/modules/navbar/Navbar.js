import React from 'react';
import { Link } from 'react-router-dom';
import { createLaneRequest } from '../lane/LaneActions';
import { connect } from 'react-redux';
import { fetchKanban, getKanbansRequest } from '../kanban/KanbanActions';
import { userLogoutRequest } from '../_user/UserActions';
import { bindActionCreators } from 'redux';

class Navbar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			kanbans: [],
			isAddVisible: false
		}
	}

	handleAddLane = () => {
		if(this.state.isAddVisible) {
			const name = document.querySelector('#newLaneName').value
			this.props.addLane(this.props.kanban._id, {name})
			this.setState({isAddVisible: false})
		} else {
			this.setState({isAddVisible: true})
		}
	}

	render() {
		const {user, edit, fetchKanban, kanbans} = this.props
		return (
			<nav className="navbar navbar-dark bg-dark">
				<Link
					to="/user"
					className={`navbar-brand ${edit ? ' edit editKanban' : ''}`}
					contentEditable={!!edit} suppressContentEditableWarning
				>{user.username}</Link>
				<div className="navbar-nav flex-row">
					<button
						onClick={e => this.props.userLogoutRequest()}
						className="btn btn-warning nav-item"
					>logout</button>
					{this.state.isAddVisible ? this.AddNameModal() : null}
					<select
						onChange={e => fetchKanban(e.target.value)}
						className="custom-select nav-item"
						id="selectBoard"
					>{kanbans.map(kanban => <option key={kanban._id} value={kanban._id}>{kanban.name}</option>)}</select>
					{this.props.kanban.admins && this.props.kanban.admins.includes(this.props.user._id) ?
						<button
							onClick={this.handleAddLane}
							className="btn btn-success nav-item"
						>{this.state.isAddVisible ? 'Add lane' : 'New lane'}</button> : null}
				</div>
			</nav>
		)
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
	)

}

const mapStateToProps = state => ({
	edit: state.edit,
	kanbans: state.user.kanbans || [],
	kanban: state.kanban ,
	user: state.user
})

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		addLane: createLaneRequest,
		fetchKanban,
		getKanbansRequest,
		userLogoutRequest
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
