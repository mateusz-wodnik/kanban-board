import React from 'react';
import { Link } from 'react-router-dom';
import { createLaneRequest } from '../lane/LaneActions'
import { connect } from 'react-redux';
import { fetchKanban, getKanbansRequest } from '../kanban/KanbanActions';
import { bindActionCreators } from 'redux'

class Navbar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			kanbans: [],
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

	componentDidMount() {
		fetch(`http://localhost:3000/api/kanbans`)
			.then(res => res.json())
			.then(kanbans => this.setState({kanbans}))
	}

	render() {
		return (
			<nav className="navbar navbar-dark bg-dark">
				<Link to="/" className="navbar-brand">
					<h2>{this.props.kanban.name}</h2>
				</Link>
				<div className="navbar-nav flex-row">
					{this.state.isAddVisible ? this.AddNameModal() : null}
					<select
						onChange={e => this.props.fetchKanban(e.target.value)}
						class="custom-select nav-item"
						id="selectBoard"
					>{this.state.kanbans.map(kanban => <option value={kanban._id}>{kanban.name}</option>)}</select>
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
	kanbans: [],
	kanban: state.kanban
})

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		addLane: createLaneRequest,
		fetchKanban,
		getKanbansRequest
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
