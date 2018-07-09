import React from 'react';
import './Note.css';

class Note extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isEditable: false
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
			</div>
		)
	}
}

export default Note;
