import React from 'react';
import { Link } from 'react-router-dom';
import { createLaneRequest } from '../lane/LaneActions'
import { connect } from 'react-redux';
import { fetchKanban } from '../kanban/KanbanActions';
import * as laneActions from '../lane/LaneActions'
import { bindActionCreators } from 'redux'
import { createNoteRequest } from '../note/NoteActions'

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
			this.props.addLane(this.props.kanban._id, {name})
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
					<button onClick={() => this.props.fetchKanban("5b3d38a01209cf202abbeb65")} className="btn">1</button>
					<button onClick={() => this.props.fetchKanban("5b3d8607120a77520aa2dc96")} className="btn">2</button>
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

const mapStateToProps = state => ({
	kanban: state.kanban
})
// const mapDispatchToProps = {
// 	addLane: createLaneRequest,
// 	fetchKanban
// }

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		addLane: createLaneRequest,
		fetchKanban
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
