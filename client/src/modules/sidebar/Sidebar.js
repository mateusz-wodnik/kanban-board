import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'

const Sidebar = () => {
	return (
		<section className="sidebar">
			<div className="list-group">
				<Link to="/" className=" sidebar__link list-group-item list-group-item-action active">||| <p className="sidebar__text">Current Board</p></Link>
				<Link to="/" className=" sidebar__link list-group-item list-group-item-action">||| <p className="sidebar__text">Activity Log</p></Link>
				<Link to="/" className=" sidebar__link list-group-item list-group-item-action">||| <p className="sidebar__text">Board Editor</p></Link>
				<Link to="/" className=" sidebar__link list-group-item list-group-item-action">||| <p className="sidebar__text">Backlog</p></Link>
				<Link to="/" className=" sidebar__link list-group-item list-group-item-action">||| <p className="sidebar__text">To Do Board</p></Link>
				<Link to="/" className=" sidebar__link list-group-item list-group-item-action">||| <p className="sidebar__text">Calendar</p></Link>
				<Link to="/" className=" sidebar__link list-group-item list-group-item-action">||| <p className="sidebar__text">ESP</p></Link>
				<Link to="/" className=" sidebar__link list-group-item list-group-item-action">||| <p className="sidebar__text">Team</p></Link>
				<Link to="/" className=" sidebar__link list-group-item list-group-item-action">||| <p className="sidebar__text">Settings</p></Link>
			</div>
		</section>
	)
}

export default Sidebar;
