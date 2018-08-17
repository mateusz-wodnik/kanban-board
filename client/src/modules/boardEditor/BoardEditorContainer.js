import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createKanbanRequest } from '../kanban/KanbanActions';
import BoardForm from './BoardForm';
import './BoardEditor.css';

class BoardEditorContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			lanes: [],
			priority: {
				normal: '#0000FF',
				low: '#00FF00',
				high: '#FFFF00',
				critical: '#FF0000',
			}
		}
	}

	handleAddLane = (e) => {
		e.preventDefault();
		this.setState({
			lanes: [...this.state.lanes, {
				name: '',
				active: true,
				color: "",
			}]
		});
	}

	handleChange = (data) => {
		const name = data.name;
		const value = () => {
			switch(name) {
				case "active":
					return data.checked;
				default:
					return data.value;
			}
		}
		const id = data.closest('fieldset').id;
		const lanes = this.state.lanes;
		lanes[id] = {...lanes[id], [name]: value()};
		this.setState({
			lanes,
		})
	}

	handleColorChange = (e) => {
		e.target.parentNode.style.backgroundColor = e.target.value;
		this.setState({
			priority: {...this.state.priority, [e.target.id]: e.target.value},
		});
	}

	handleSave = (e) => {
		e.preventDefault();
		const form = e.target.form.elements;
		const body = {
			kanban: {
				name: form.boardName.value,
				description: form.boardDescription.value,
				priority: this.state.priority,
			},
			lanes: this.state.lanes,
		}
		this.props.createKanbanRequest(body);
		this.props.history.push("/board")
	}

	render() {
		const { kanban } = this.props;
		const { priority, lanes } = this.state;
		const { handleColorChange, handleSave, handleAddLane, handleChange } = this;
		return (
			<section className="board-editor">
				<BoardForm
					kanban={kanban}
					lanes={lanes}
					handleChange={handleChange}
					priority={priority}
					handleColorChange={handleColorChange}
					handleSave={handleSave}
					handleAddLane={handleAddLane}
				/>
			</section>
		);
	}
}

const mapStateToProps = state => ({
	kanban: state.kanban,
	lanes: state.lanes,
});

const mapDispatchToProps = {
	createKanbanRequest,
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardEditorContainer);
