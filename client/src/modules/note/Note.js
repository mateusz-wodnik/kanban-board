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
			this.props.updateNote({id: this.props.id, header: values[0], task: values[1]})
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
		const props = this.props
		return (
			<div className="note card list-group-item">
				<div className="btn-group" role="group" aria-label="First group">
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
					<h5 className="note__header card-title">{props.header}</h5>
					<p className="note__task card-text">{props.children}</p>
				</div>
				<div className="btn-group" role="group" aria-label="First group">
					<button type="button" className="btn btn-light">1</button>
					<button type="button" className="btn btn-light">2</button>
					<button
						onClick={() => props.deleteNote(props.id, props.laneId)}
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
