import React from 'react';
import './Note.css';
import { DragSource } from 'react-dnd/lib/index';

const Note = ({ note,
								laneId,
								isEditable,
								progress,
								hours,
								deleteNoteRequest,
								priority,
								isAdmin,
								team,
								connectDragSource,
								handleUpdate,
								handleTaken,
}) => {
	return connectDragSource(
		<div className={`note card`} style={{borderColor: priority[note.priority]}}>
			<div className="btn-group card-header" role="group" aria-label="First group">
				<button
					onClick={handleUpdate}
					type="button"
					className={`btn btn-light${isAdmin ? '' : ' disabled'}`}
				>{isEditable ? '✓' : '✎'}</button>
				<button
					onClick={handleTaken}
					type="button"
					className={`btn btn-light${!note.taken ? '' : ' disabled'}`}
				>{note.taken ? team.find(user => user._id === note.taken).username : 'take'}</button>
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
					className={`note__delete btn btn-light${isAdmin ? '' : ' disabled'}`}
				>🛇</button>
				<button type="button" className="btn btn-light">4</button>
			</div>
			<div className="progress justify-content-between">
				<div className="progress-bar"
						 role="progressbar"
						 style={{width: `${progress}%`}}
						 aria-valuenow={progress}
						 aria-valuemin="0"
						 aria-valuemax="100"
				></div>
				<p className="mr-1">{hours}</p>
			</div>
		</div>
	);
}

const type = 'note';

const spec = {
	beginDrag(props) {
		return props;
	},
	endDrag(props) {
		const notes = props.note._id;
		props.updateLaneRequest(props.laneId, {notes}, true);
	}
}

const collect = (connect, monitor) => {
	return {
		connectDragSource: connect.dragSource(),
		connectDragPreview: connect.dragPreview(),
		isDragging: monitor.isDragging(),
	}
}

export default DragSource(type, spec, collect)(Note);


