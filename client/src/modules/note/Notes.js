import React from 'react';
import Note from './NoteContainer'

const Notes = ({ notes, laneId }) => {
	return (
		<div className="list-group">
			{notes.map(note => (
				<Note
					id={note._id}
					laneId={laneId}
					key={note._id}
					header={note.name}
				>{note.task}</Note>
			))}
		</div>
	)
}


export default Notes
