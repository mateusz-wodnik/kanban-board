import React from 'react';

const Note = (props) => {
	return (
		<div className="note list-group-item">
			<h5 className="note__header">{props.header}</h5>
			<p className="note__task">{props.children}</p>
			<button
				onClick={() => props.deleteNote(props.id, props.laneId)}
				className="btn btn-danger"
			>Delete note</button>
			<button
				onClick={() => props.updateNote({id: props.id, task: 'eloelo'})}
				className="btn btn-success"
			>Edit note</button>
		</div>
	)
}

export default Note;


const Modal = () => {
	return (
		<div className="modal">
			<input type="text" name="elo" id="mordo"/>
			<p>ELOELOELOELO</p>
		</div>
	)
}
