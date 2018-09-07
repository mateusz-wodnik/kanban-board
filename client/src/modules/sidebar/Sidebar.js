import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faPlus,
	faEdit,
	faChartPie,
	faColumns,
	faCalendarAlt,
	faUsers,
	faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ isAdmin, user, kanban, kanbans, fetchKanban, userLogoutRequest }) => (
	<section className="sidebar">
	<input id="toggleSidebar" className="btn btn-primary" type="checkbox" />
		<div className="sidebar__nav list-group">
			{ user && user.kanbans && 
				<select
					onChange={e => fetchKanban(e.target.value)}
					className="custom-select form-control navbar__select"
					id="selectBoard"
					value={kanban._id}
				>
					{kanbans.map(kanban => <option key={kanban._id} value={kanban._id}>{kanban.name}</option>)}
				</select>
			}
			<NavLink to="/board"
							 activeClassName="sidebar__link--active"
							 className="sidebar__link list-group-item list-group-item-action"
			><FontAwesomeIcon icon={faColumns} /><p className="sidebar__text">Current Board</p>
			</NavLink>
			<NavLink to="/create-board"
							 activeClassName="sidebar__link--active"
							 className="sidebar__link list-group-item list-group-item-action"
			><FontAwesomeIcon icon={faPlus} /><p className="sidebar__text">Create Board</p>
			</NavLink>
			<NavLink to="/board-editor"
							 activeClassName="sidebar__link--active"
							 className={`sidebar__link list-group-item list-group-item-action${isAdmin ? '' :' disabled'}`}
			><FontAwesomeIcon icon={faEdit} /><p className="sidebar__text">Board Editor</p>
			</NavLink>
			<NavLink to="/analytics"
							 activeClassName="sidebar__link--active"
							 className="sidebar__link list-group-item list-group-item-action"
			><FontAwesomeIcon icon={faChartPie} /><p className="sidebar__text">Analytics</p>
			</NavLink>
			<NavLink to="/calendar"
							 activeClassName="sidebar__link--active"
							 className="sidebar__link list-group-item list-group-item-action"
			><FontAwesomeIcon icon={faCalendarAlt} /><p className="sidebar__text">Calendar</p>
			</NavLink>
			<NavLink to="/team"
							 activeClassName="sidebar__link--active"
							 className={`sidebar__link list-group-item list-group-item-action${isAdmin ? '' :' disabled'}`}
			><FontAwesomeIcon icon={faUsers} /><p className="sidebar__text">Team</p>
			</NavLink>
			<button onClick={userLogoutRequest} className="btn btn-warning form-control navbar__btn" ><FontAwesomeIcon icon={faSignOutAlt} /></button>
		</div>
	</section>
);

export default Sidebar;
