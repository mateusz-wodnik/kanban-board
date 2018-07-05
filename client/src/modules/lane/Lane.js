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

	handleAddNote = () => {
		if(this.state.isAddVisible) {
			const name = document.querySelector('#newNoteHeader').value
			const task = document.querySelector('#newNoteTask').value
			const laneId = this.props.lane._id
			this.props.addNote(laneId, {name, task, importance: "important"})
			this.setState({isAddVisible: false})
		} else {
			this.setState({isAddVisible: true})
		}
	}

	render() {
		const { lane, deleteLaneRequest, laneNotes } = this.props;
		const laneId = lane._id
		return (
			<section className="lane card">
				<header className="card-header">
					<h5 className="lane__name">{lane.name}<span className="lane__count badge badge-light">{laneNotes.length}</span></h5>
					<button
						onClick={() => deleteLaneRequest(laneId)}
						className="lane__delete btn btn-light btn-sm"
					>x</button>
					<div className="lane__add-container" role="group" aria-label="Lane actions">
						<button
							onClick={this.handleAddNote}
							className="lane__add btn btn-success btn-sm"
						>{this.state.isAddVisible ? 'Add note' : 'New note'}</button>
						{this.state.isAddVisible ? this.AddNoteModal() : null}
					</div>
				</header>
				<Notes laneId={laneId} notes={laneNotes}/>
			</section>
		)
	}

	AddNoteModal = () => (
		<div className="add-note-modal">
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
		</div>
	)
}

export default Lane;
