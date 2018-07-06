import React from 'react';
import { connect } from 'react-redux';
import { createLaneRequest } from '../lane/LaneActions'

import './BoardEditor.css'

const BoardEditor = (props) => (
	<section className="board-editor">
		<BoardForm lanes={props.lanes} kanban={props.kanban} createLaneRequest={props.createLaneRequest}/>
	</section>
)

class BoardForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			lanes: [],
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
		console.log(this.state.lanes[0])
	}

	handleSave = (e) => {
		e.preventDefault()
		const form = e.target.form.elements
		const body = {
			kanban: {
				name: form.boardName.value,
				description: form.boardDescription.value
			},
			lanes: this.state.lanes
		}
		console.log(body)
		fetch('http://localhost:3000/api/kanbans', {
			method: "POST",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		})
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

const mapStateToProps = state => ({
	kanban: state.kanban,
	lanes: state.lanes
})

const mapDispatchToProps = {
	createLaneRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardEditor);
