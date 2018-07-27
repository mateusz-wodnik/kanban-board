import React from 'react';
import Note from './NoteContainer'
import { DropTarget } from 'react-dnd/lib/index'

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
	)
}

const collect = (connect, monitor) => {
	return {
		connectDropTarget: connect.dropTarget(),
		hovered: monitor.isOver(),
		item: monitor.getItem()
	}
}

const spec = {
	// hover(props, monitor, component) {
	// 	// console.log(monitor.getItem().laneId)
	// 	console.log(props.laneId)
	// }
	drop(props, monitor, component) {
		const notes = monitor.getItem().note._id
		props.updateLaneRequest(props.laneId, {notes}, false)
	}
	// canDrop(props, monitor) {
	// 	return !props.users.some(user => monitor.getItem().user._id === user._id)
	// }
}

export default DropTarget('note', spec, collect)(Notes);
