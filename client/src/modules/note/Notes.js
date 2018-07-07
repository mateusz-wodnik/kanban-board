import React from 'react';
import Note from './NoteContainer'

const Notes = ({ notes, laneId }) => {
	return (
		<div className="card-body">
			{notes.map(note => (
				<Note
					laneId={laneId}
					key={note._id}
					note={note}
				/>
			))}
		</div>
	)
}


export default Notes
