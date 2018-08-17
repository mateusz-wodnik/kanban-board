import React from 'react';
import { connect } from 'react-redux';
import Note from './NoteContainer';
import { DropTarget } from 'react-dnd/lib/index';
import { bindActionCreators } from 'redux';
import { moveNoteRequest } from './NoteActions';

const Notes = ({ notes, laneId, connectDropTarget }) => {
	return connectDropTarget(
		<div className="card-body">
			{notes.map(note => (
				<Note
					laneId={laneId}
					key={note._id}
					note={note}
				/>
			))}
		</div>
	);
}

const collect = (connect, monitor) => {
	return {
		connectDropTarget: connect.dropTarget(),
		hovered: monitor.isOver(),
		item: monitor.getItem(),
	}
}


// React DnD TARGET
const spec = {
	drop(props, monitor) {
		const note = monitor.getItem().note._id;
		props.moveNoteRequest(note, props.laneId)
	}
}

const mapDispathToProps = (dispatch) => {
	return bindActionCreators({ moveNoteRequest }, dispatch);
}

export default connect(null, mapDispathToProps)(DropTarget('note', spec, collect)(Notes));
