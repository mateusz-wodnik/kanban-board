import React from 'react'
import Notes from '../note/Notes'
import './Lane.css'

const Lane = ({ lane,
								deleteLaneRequest,
								updateLaneRequest,
								laneNotes,
								edit,
								isEdited,
								laneId,
								AddNoteModal,
								isAddVisible,
								handleColorChange,
								handleEditLane,
								handleAddNote,
								captionEdit,}) => (
	<section onInput={captionEdit} id={laneId} className="lane card" style={{background: lane.color}}>
		<header className="card-header">
			<h5
				name="name"
				className={`lane__name${edit ? ' edit editLane' : ''}`}
				contentEditable={!!edit} suppressContentEditableWarning
			>{lane.name}</h5>
			<span className="lane__count badge badge-pill badge-light">{laneNotes.length}</span>
			{edit ?
				<React.Fragment>
					<button
						onClick={() => deleteLaneRequest(laneId)}
						className="lane__delete btn btn-light btn-sm"
					>x</button>
					<button
						onClick={handleAddNote}
						className="lane__add btn btn-success btn-sm"
					>{isAddVisible ? 'Add note' : 'New note'}</button>
					{isAddVisible ? <AddNoteModal handleAddNote={handleAddNote}/> : null}
				</React.Fragment> : null
			}
		</header>
		<Notes laneId={laneId} notes={laneNotes} updateLaneRequest={updateLaneRequest}/>
			{edit ?
				<div className="card-footer d-flex justify-content-between">
					<input
						onChange={handleColorChange}
						name="laneColor"
						className={`lane__color h-100${edit ? ' editLane' : ''}`}
						type="color"
						defaultValue={lane.color}
					/>
					<button
						onClick={handleEditLane}
						className={`lane__confirm btn ${isEdited ? 'btn-warning' : 'btn-success'}`}
					>{isEdited ? '✎' : '✓' }</button>
				</div> : null}
	</section>
);

export default Lane;
