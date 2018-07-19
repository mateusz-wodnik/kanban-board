import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEdit, faUserEdit, faChartPie, faColumns, faCalendarAlt, faCogs, faUsers } from '@fortawesome/free-solid-svg-icons'

const Sidebar = ({isAdmin}) => {
	return (
		<section className="sidebar">
			<div className="list-group">
				<NavLink to="/board" activeClassName="sidebar__link--active" className="sidebar__link list-group-item list-group-item-action"><FontAwesomeIcon icon={faColumns} /> <p className="sidebar__text">Current Board</p></NavLink>
				<NavLink to="/create-board" activeClassName="sidebar__link--active" className="sidebar__link list-group-item list-group-item-action"><FontAwesomeIcon icon={faPlus} /> <p className="sidebar__text">Create Board</p></NavLink>
				<NavLink to="/board-editor" activeClassName="sidebar__link--active" className={`sidebar__link list-group-item list-group-item-action${isAdmin ? '' :' disabled'}`}><FontAwesomeIcon icon={faEdit} /> <p className="sidebar__text">Board Editor</p></NavLink>
				<NavLink to="/analytics" activeClassName="sidebar__link--active" className="sidebar__link list-group-item list-group-item-action"><FontAwesomeIcon icon={faChartPie} /> <p className="sidebar__text">Analytics</p></NavLink>
				<NavLink to="/calendar" activeClassName="sidebar__link--active" className="sidebar__link list-group-item list-group-item-action"><FontAwesomeIcon icon={faCalendarAlt} /> <p className="sidebar__text">Calendar</p></NavLink>
				<NavLink to="/team" activeClassName="sidebar__link--active" className={`sidebar__link list-group-item list-group-item-action${isAdmin ? '' :' disabled'}`}><FontAwesomeIcon icon={faUsers} /> <p className="sidebar__text">Team</p></NavLink>
				<NavLink to="/settings" activeClassName="sidebar__link--active" className="sidebar__link list-group-item list-group-item-action"><FontAwesomeIcon icon={faCogs} /> <p className="sidebar__text">Settings</p></NavLink>
			</div>
		</section>
	)
}

export default Sidebar;
