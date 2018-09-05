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
				{ user._id &&
					<button onClick={userLogoutRequest} className="btn btn-warning form-control navbar__btn" >logout</button>  
				}
				{ isAddVisible ? AddNameModal() : null }
				{ user.kanbans && 
					<select
						onChange={e => fetchKanban(e.target.value)}
						className="custom-select form-control navbar__select"
						id="selectBoard"
						value={kanban._id}
					>
						{kanbans.map(kanban => <option key={kanban._id} value={kanban._id}>{kanban.name}</option>)}
					</select>
				}
				{ kanban.admins && kanban.admins.includes(user._id) ?
					<button onClick={handleAddLane} className="btn btn-success form-control navbar__btn">{isAddVisible ? 'Add lane' : 'New lane'}</button>
					: null 
				}
			</div>
		</nav>
	);
}

export default Navbar;
