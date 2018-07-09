import React from 'react'
import Notes from '../note/Notes'
import './Lane.css'

class Lane extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			isAddVisible: false
		}
	}

	handleAddNote = (e) => {
		if(this.state.isAddVisible) {
			console.log(e.target.closest('#addNoteForm'))
			const name = document.querySelector('#newNoteHeader').value
			const task = document.querySelector('#newNoteTask').value
			const priority = document.querySelector('#newNotePriority').value
			const laneId = this.props.lane._id
			this.props.addNote(laneId, {name, task, priority})
			this.setState({isAddVisible: false})
		} else {
			this.setState({isAddVisible: true})
		}
	}

	handleEditLane = (e) => {
		const lane = e.target.closest('.lane')
		const laneUpdates = lane.querySelectorAll('.editLane')
		const laneBody = {
			name: laneUpdates[0].textContent,
			color: laneUpdates[1].value
		}
		this.props.updateLaneRequest(lane.id, laneBody)
	}

	handleColorChange = (e) => {
		e.target.closest('.lane').style.backgroundColor = e.target.value
	}

	render() {
		const { lane, deleteLaneRequest, laneNotes } = this.props;
		const laneId = lane._id
		return (
			<section id={laneId} className="lane card" style={{background: lane.color}}>
				<header className="card-header">
					<h5
						name="name" className={`lane__name${this.props.edit ? ' edit editLane' : ''}`}
						contentEditable={!!this.props.edit}
					>{lane.name}</h5>
					<span className="lane__count badge badge-pill badge-light">{laneNotes.length}</span>
					{this.props.edit ?
						<React.Fragment>
							<button
								onClick={() => deleteLaneRequest(laneId)}
								className="lane__delete btn btn-light btn-sm"
							>x</button>
							<button
								onClick={this.handleAddNote}
								className="lane__add btn btn-success btn-sm"
							>{this.state.isAddVisible ? 'Add note' : 'New note'}</button>
							{this.state.isAddVisible ? this.AddNoteModal() : null}
						</React.Fragment> : null
					}
				</header>
				<Notes laneId={laneId} notes={laneNotes}/>
					{this.props.edit ?
						<div className="card-footer">
							<input
								onChange={this.handleColorChange}
								id="laneColor"
								className={`${this.props.edit ? ' editLane' : ''}`}
								type="color"
								defaultValue={lane.color}
							/>
							<button
								onClick={this.handleEditLane}
								className="btn"
							>'✓' : '✎'</button>
						</div> : null}

			</section>
		)
	}

	AddNoteModal = () => (
		<form className="add-note-modal form-group" id="addNoteForm">
			<input
				onKeyDown={e => {
					if(e.keyCode === 13) this.handleAddNote()
				}}
				id="newNoteHeader"
				type="text"
				className="form-control"
				placeholder="Name"
				aria-label="Name"
				aria-describedby="basic-addon1"
			/>
			<input
				onKeyDown={e => {
					if(e.keyCode === 13) this.handleAddNote()
				}}
				id="newNoteTask"
				type="text"
				className="form-control"
				placeholder="Task"
				aria-label="Task"
				aria-describedby="basic-addon1"
			/>
			<select className="form-control" id="newNotePriority" defaultValue="normal">
				<option value="normal">Normal</option>
				<option value="high">High</option>
				<option value="low">Low</option>
				<option value="critical">Critical</option>
			</select>
		</form>
	)
}

export default Lane;
