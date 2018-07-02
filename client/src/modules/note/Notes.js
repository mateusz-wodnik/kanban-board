import React from 'react';
import Note from './NoteContainer'

const Notes = ({ notes, laneId }) => {
	return (
		<div className="list-group">
			{notes.map(note => (
				<Note
					id={note.id}
					laneId={laneId}
					key={note.id}
					header={note.header}
				>{note.task}</Note>
			))}
		</div>
	)
}


export default Notes
