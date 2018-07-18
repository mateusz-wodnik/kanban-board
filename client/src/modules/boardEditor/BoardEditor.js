import React from 'react';
import { connect } from 'react-redux';
import { createKanbanRequest } from '../kanban/KanbanActions'

import './BoardEditor.css'

const BoardEditor = (props) => (
	<section className="board-editor">
		<BoardForm lanes={props.lanes} kanban={props.kanban} createKanbanRequest={props.createKanbanRequest}/>
	</section>
)

class BoardForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			lanes: [],
			priority: { normal: '#0000FF', low: '#00FF00', high: '#FFFF00', critical: '#FF0000' }
		}
	}

	handleAddLane = (e) => {
		e.preventDefault()
		this.setState({
			lanes: [...this.state.lanes, {
				name: '',
				active: true,
				color: ""
			}]
		})
	}

	handleChange = (data) => {
		const name = data.name
		const value = () => {
			switch(name) {
				case "active":
					return data.checked
				default:
					return data.value
			}
		}
		const id = data.closest('fieldset').id
		const lanes = this.state.lanes
		lanes[id] = {...lanes[id], [name]: value()}
		this.setState({
			lanes
		})
	}

	handleColorChange = (e) => {
		e.target.parentNode.style.backgroundColor = e.target.value
		this.setState({
			priority: {...this.state.priority, [e.target.id]: e.target.value}
		})
	}

	handleSave = (e) => {
		e.preventDefault()
		const form = e.target.form.elements
		const body = {
			kanban: {
				name: form.boardName.value,
				description: form.boardDescription.value,
				priority: this.state.priority
			},
			lanes: this.state.lanes,
		}
		this.props.createKanbanRequest(body)
	}

	render() {
		return (
			<form className="board-editor__form w-50">
				<div className="form-group">
					<label htmlFor="boardName">Board name</label>
					<input
						type="text"
						name="boardName"
						className="form-control"
						placeholder="Board name"
						defaultValue={this.props.kanban.name}
					/>
				</div>
				<div className="form-group" onChange={(e) => this.handleChange(e.target)}>
					{this.state.lanes.length ? <label htmlFor="lanesNumber">Lanes</label> : null}
					{this.state.lanes.map((lane, idx) => <NewLane key={idx} id={idx} lane={lane} handleChange={this.handleChange}/>)}
				</div>
					<button
						onClick={this.handleAddLane}
						className="btn btn-primary"
					>Add lane</button>
				<div className="form-group">
					<label htmlFor="boardDescription">Description</label>
					<textarea
						className="form-control"
						name="boardDescription"
						id="boardDescription"
						rows="3"
					></textarea>
				</div>
				<div className="form-group">
					{Object.keys(this.state.priority).map((name, idx) => <Priority key={idx} name={name} color={this.state.priority[name]} handleColorChange={this.handleColorChange} />)}
				</div>
				<button onClick={this.handleSave} className="btn">Create board</button>
			</form>
		)
	}
}

const NewLane = ({lane, handleChange, id}) => (
	<fieldset id={id} className="input-group mb-3">
		<div className="input-group-prepend">
			<div className="input-group-text">
				<input
					name="active"
					type="checkbox"
					aria-label="Checkbox for following text input"
					defaultChecked={!lane.active}
				/>
			</div>
		</div>
		<input
			name="name"
			type="text"
			className="form-control"
			placeholder="Lane name"
			defaultValue={lane.name}
			aria-label="Text input with checkbox"
		/>
		<div className="input-group-prepend">
			<div className="input-group-text">
				<input
					name="color"
					type="color"
				/>
			</div>
		</div>
	</fieldset>
)

const Priority = ({name, color, handleColorChange}) => (
	<div className="input-group">
		<div className="input-group-prepend">
			<span className="input-group-text" id="basic-addon1">{name}</span>
		</div>
		<div className="input-group-prepend">
			<div className="input-group-text" style={{background: color}}>
				<input
					onChange={handleColorChange}
					type="color"
					name="priority"
					className="form-control priority"
					id={name}
					aria-label="Username"
					aria-describedby="basic-addon1"
					defaultValue={color}
				/>
			</div>
		</div>
	</div>
)

const mapStateToProps = state => ({
	kanban: state.kanban,
	lanes: state.lanes
})

const mapDispatchToProps = {
	createKanbanRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardEditor);
