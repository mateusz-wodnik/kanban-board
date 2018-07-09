import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'

const Sidebar = () => {
	return (
		<section className="sidebar">
			<div className="list-group">
				<Link to="/board" className=" sidebar__link list-group-item list-group-item-action active">||| <p className="sidebar__text">Current Board</p></Link>
				<Link to="/create-board" className=" sidebar__link list-group-item list-group-item-action">||| <p className="sidebar__text">Create Board</p></Link>
				<Link to="/board-editor" className=" sidebar__link list-group-item list-group-item-action">||| <p className="sidebar__text">Board Editor</p></Link>
				<Link to="/analytics" className=" sidebar__link list-group-item list-group-item-action">||| <p className="sidebar__text">Analytics</p></Link>
				<Link to="/" className=" sidebar__link list-group-item list-group-item-action">||| <p className="sidebar__text">Activity Log</p></Link>
				<Link to="/" className=" sidebar__link list-group-item list-group-item-action">||| <p className="sidebar__text">Calendar</p></Link>
				<Link to="/" className=" sidebar__link list-group-item list-group-item-action">||| <p className="sidebar__text">ESP</p></Link>
				<Link to="/" className=" sidebar__link list-group-item list-group-item-action">||| <p className="sidebar__text">Team</p></Link>
				<Link to="/" className=" sidebar__link list-group-item list-group-item-action">||| <p className="sidebar__text">Settings</p></Link>
			</div>
		</section>
	)
}

export default Sidebar;
