import React from 'react';
import Note from './NoteContainer';
import { DropTarget } from 'react-dnd/lib/index';

const Notes = ({ notes, laneId, connectDropTarget, updateLaneRequest }) => {
	return connectDropTarget(
		<div className="card-body">
			{notes.map(note => (
				<Note
					laneId={laneId}
					key={note._id}
					note={note}
					updateLaneRequest={updateLaneRequest}
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

const spec = {
	drop(props, monitor) {
		const notes = monitor.getItem().note._id;
		props.updateLaneRequest(props.laneId, {notes}, false);
	}
}

export default DropTarget('note', spec, collect)(Notes);
