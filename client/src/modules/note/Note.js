import React from 'react';
import './Note.css';

class Note extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isEditable: false,
			progress: 0
		}
	}

	handleUpdate = (e) => {
		e.target.classList.toggle('check')
		const items = [...e.target.closest('.note').querySelector('.card-body').children]

		items.forEach(item => {
			item.contentEditable = true
			item.classList.add('edit')
		})

		if(this.state.isEditable) {
			const values = items.map(item => item.innerText)
			this.props.updateNoteRequest(this.props.note._id, {name: values[0], task: values[1]})
			this.setState({isEditable: false})
			items.forEach(item => {
				item.contentEditable = false
				item.classList.remove('edit')
			})
			return
		}

		this.setState({isEditable: true})
	}

	componentDidMount() {
		const note = this.props.note
		this.handleDate(note.creationDate, note.dueDate)
	}

	handleDate = (start, end) => {
		const startDate = new Date(start)
		const endDate = new Date(end)
		const timeDiff = Math.abs(endDate - startDate);
		const timeLeft = Math.abs(new Date() - startDate)
		const toHours = (diff) => Math.ceil(diff / (1000 * 3600));
		const format = (hours) => hours > 24 ? `${Math.ceil(hours / 24)} days left` : `${Math.ceil(hours)} hours left`
		this.setState({
			progress: toHours(timeLeft) / toHours(timeDiff) * 100,
			hours: format(toHours(endDate - new Date()))
		})
	}

	render() {
		const {note, laneId, deleteNoteRequest, priority} = this.props
		return (
			<div className={`note card`} style={{borderColor: priority[note.priority]}}>
				<div className="btn-group card-header" role="group" aria-label="First group">
					<button
						onClick={this.handleUpdate}
						type="button"
						className="btn btn-light"
					>{this.state.isEditable ? '✓' : '✎'}</button>
					<button type="button" className="btn btn-light">2</button>
					<button type="button" className="btn btn-light">3</button>
					<button type="button" className="btn btn-light">4</button>
				</div>
				<div className="card-body">
					<h5 className="note__header card-title">{note.name}</h5>
					<p className="note__task card-text">{note.task}</p>
				</div>
				<div className="btn-group card-footer" role="group" aria-label="First group">
					<button type="button" className="btn btn-light">1</button>
					<button type="button" className="btn btn-light">2</button>
					<button
						onClick={() => deleteNoteRequest(note._id, laneId)}
						type="button"
						className="note__delete btn btn-light"
					>🛇</button>
					<button type="button" className="btn btn-light">4</button>
				</div>
				<div className="progress justify-content-between">
					<div className="progress-bar"
							 role="progressbar"
							 style={{width: `${this.state.progress}%`}}
							 aria-valuenow={this.state.progress}
							 aria-valuemin="0"
							 aria-valuemax="100"
					></div>
					<p className="mr-1">{this.state.hours}</p>
				</div>
			</div>
		)
	}
}

export default Note;
