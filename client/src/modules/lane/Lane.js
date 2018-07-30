import React from 'react'
import Notes from '../note/Notes'
import './Lane.css'

class Lane extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			isAddVisible: false,
			isEdited: false
		}
	}

	captionEdit = (e) => {
		if(e.target.classList.contains('lane__name') || e.target.classList.contains('lane__color')) {
			this.setState({isEdited: true})
		}
	}

	handleAddNote = (e) => {
		if(this.state.isAddVisible) {
			const data = document.querySelector('#addNoteForm').elements.newNote
			const output = {}
			data.forEach(input => output[input.id] = input.value)
			output.dueDate = output.dueDate.trim().replace(' ', 'T')
			const laneId = this.props.lane._id
			this.props.addNote(laneId, output)
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
		this.setState({isEdited: false})
	}

	handleColorChange = (e) => {
		e.target.closest('.lane').style.backgroundColor = e.target.value
	}

	render() {
		const { lane, deleteLaneRequest, laneNotes, edit } = this.props;
		const { isEdited } = this.state;
		const laneId = lane._id
		return (
			<section onInput={this.captionEdit} id={laneId} className="lane card" style={{background: lane.color}}>
				<header className="card-header">
					<h5
						name="name"
						className={`lane__name${this.props.edit ? ' edit editLane' : ''}`}
						contentEditable={!!this.props.edit} suppressContentEditableWarning
					>{lane.name}</h5>
					<span className="lane__count badge badge-pill badge-light">{laneNotes.length}</span>
					{edit ?
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
				<Notes laneId={laneId} notes={laneNotes} updateLaneRequest={this.props.updateLaneRequest}/>
					{this.props.edit ?
						<div className="card-footer d-flex justify-content-between">
							<input
								onChange={this.handleColorChange}
								name="laneColor"
								className={`lane__color h-100${this.props.edit ? ' editLane' : ''}`}
								type="color"
								defaultValue={lane.color}
							/>
							<button
								onClick={this.handleEditLane}
								className={`lane__confirm btn ${isEdited ? 'btn-warning' : 'btn-success'}`}
							>{isEdited ? '✎' : '✓' }</button>
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
				id="name"
				type="text"
				name="newNote"
				className="form-control"
				placeholder="Name"
				aria-label="Name"
				aria-describedby="basic-addon1"
			/>
			<input
				onKeyDown={e => {
					if(e.keyCode === 13) this.handleAddNote()
				}}
				id="task"
				type="text"
				name="newNote"
				className="form-control"
				placeholder="Task"
				aria-label="Task"
				aria-describedby="basic-addon1"
			/>
			<select
				className="form-control"
				id="priority"
				defaultValue="normal"
				name="newNote"
			>
				<option value="normal">Normal</option>
				<option value="high">High</option>
				<option value="low">Low</option>
				<option value="critical">Critical</option>
			</select>
			<input
				className="form-control"
				type="datetime-local"
				id="dueDate"
				name="newNote"
				placeholder="Due date: 2018-06-12 19:30"/>
		</form>
	)
}

export default Lane;
