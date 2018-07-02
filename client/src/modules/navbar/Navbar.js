import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../logo.svg'
import { createLane } from '../lane/LaneActions'
import { connect } from 'react-redux';

const Navbar = (props) => {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<a className="navbar-brand" href="#">
				<img src={logo} alt="logo" width="50" height="50" className="d-inline-block align-top"/>
			</a>
			<button className="navbar-toggler" type="checkbox" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
				<div className="navbar-nav">
					{/*<Link to='/' class="nav-item nav-link disabled">Disabled</Link>*/}
					<button
						onClick={() => props.createLane({
							name: 'New Lane',
						})}
						className="btn btn-success nav-item"
					>Add lane</button>
				</div>
			</div>
		</nav>
	)
}

const mapDispatchToProps = {
	createLane
}

export default connect(null, mapDispatchToProps)(Navbar);
