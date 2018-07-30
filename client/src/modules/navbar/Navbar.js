import React from 'react';
import { Link } from 'react-router-dom';
import { createLaneRequest } from '../lane/LaneActions';
import { connect } from 'react-redux';
import { fetchKanban, getKanbansRequest } from '../kanban/KanbanActions';
import { userLogoutRequest } from '../_user/UserActions';
import { bindActionCreators } from 'redux';

const Navbar = ({user, edit, fetchKanban, kanbans, kanban, userLogoutRequest, isAddVisible, AddNameModal, handleAddLane}) => {
		return (
			<nav className="navbar navbar-dark bg-dark">
				<Link
					to="/user"
					className={`navbar-brand ${edit ? ' edit editKanban' : ''}`}
					contentEditable={!!edit} suppressContentEditableWarning
				>{user.username}</Link>
				<div className="navbar-nav flex-row">
					<button
						onClick={userLogoutRequest}
						className="btn btn-warning nav-item"
					>logout</button>
					{isAddVisible ? AddNameModal() : null}
					<select
						onChange={e => fetchKanban(e.target.value)}
						className="custom-select nav-item"
						id="selectBoard"
					>
						{kanbans.map(kanban =>
							<option key={kanban._id} value={kanban._id}>{kanban.name}</option>)
						}
					</select>
					{kanban.admins && kanban.admins.includes(user._id) ?
						<button
							onClick={handleAddLane}
							className="btn btn-success nav-item"
						>{isAddVisible ? 'Add lane' : 'New lane'}</button> : null}
				</div>
			</nav>
		)
}

export default Navbar;
