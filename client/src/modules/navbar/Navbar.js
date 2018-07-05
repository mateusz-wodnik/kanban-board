import React from 'react';
import { Link } from 'react-router-dom';
import { createLaneRequest } from '../lane/LaneActions'
import { connect } from 'react-redux';

class Navbar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isAddVisible: false
		}
	}

	handleAddLane = () => {
		if(this.state.isAddVisible) {
			const name = document.querySelector('#newLaneName').value
			this.props.addLane({name})
			this.setState({isAddVisible: false})
		} else {
			this.setState({isAddVisible: true})
		}
	}


	render() {
		return (
			<nav className="navbar navbar-dark bg-dark">
				<Link to="/" className="navbar-brand">
					<h2>Kanban Board</h2>
				</Link>
				<div className="navbar-nav flex-row">
					{this.state.isAddVisible ? this.AddNameModal() : null}
					<button
						onClick={this.handleAddLane}
						className="btn btn-success nav-item"
					>{this.state.isAddVisible ? 'Add lane' : 'New lane'}</button>
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

const mapDispatchToProps = {
	addLane: createLaneRequest
}

export default connect(null, mapDispatchToProps)(Navbar);
