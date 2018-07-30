import React from 'react';


const AddNoteModal = ({handleAddNote}) => (
	<form className="add-note-modal form-group" id="addNoteForm">
		<input
			onKeyDown={e => {
				if(e.keyCode === 13) handleAddNote()
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
				if(e.keyCode === 13) handleAddNote()
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
);

export default AddNoteModal;
