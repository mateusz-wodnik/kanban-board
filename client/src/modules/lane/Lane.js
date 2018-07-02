import React from 'react'
import Notes from '../note/Notes'

class Lane extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			modal: false
		}
	}

	handleNewNote = () => {
		this.props.addNote({header: 'New Note', task: 'Task to do'}, this.props.lane.id)
		this.setState({modal: !this.state.modal})
	}
	render() {
		const { lane, addNote, deleteLane, laneNotes } = this.props;
		const laneId = lane.id
		return (
			<section className="card w-25">
				<header className="card-header">
					<h5>Lane header</h5>
					<div className="btn-group btn-group-sm" role="group" aria-label="Lane actions">
						<button
							onClick={this.handleNewNote}
							className="btn btn-success btn-sm"
						>Add note</button>
						{this.state.modal ? <Edit/> : null}
						<button
							onClick={() => deleteLane(laneId)}
							className="btn btn-danger btn-sm"
						>Delete lane</button>
					</div>
				</header>
				<Notes laneId={laneId} notes={laneNotes}/>
			</section>
		)
	}
}

export default Lane

const Edit = () => {
	return (
		<div className="pop">
			<input type="text" name="elo" id="mordo"/>
			<p>ELOELOELOELO</p>
		</div>
	)
}
