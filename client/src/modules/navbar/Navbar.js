import React from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css"

const Navbar = ({ props, isAddVisible, AddNameModal, handleAddLane }) => {
	const { user, edit, fetchKanban, kanbans, kanban, userLogoutRequest } = props
	return (
		<nav className="navbar navbar-dark bg-dark">
			<Link
				to="/user"
				className={`navbar-brand ${edit ? ' edit editKanban' : ''}`}
				contentEditable={!!edit} suppressContentEditableWarning
			>{user.username}</Link>
			<div className="input-group" style={{width: "inherit"}} >
				{ isAddVisible ? AddNameModal() : null }
				{ kanban.admins && kanban.admins.includes(user._id) ?
					<button onClick={handleAddLane} className="btn btn-success form-control navbar__add">{isAddVisible ? 'Add lane' : 'New lane'}</button>
					: null 
				}
			</div>
		</nav>
	);
}

export default Navbar;
