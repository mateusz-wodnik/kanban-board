import React from 'react';
import NewLane from './NewLane';
import Priority from './Priority';


const BoardForm = ({
										 kanban,
										 lanes,
										 handleChange,
										 priority,
										 handleColorChange,
										 handleSave,
										 handleAddLane,
}) => (
	<form className="board-editor__form container ml-0">
		<div className="form-group">
			<label htmlFor="boardName">Board name</label>
			<input
				type="text"
				name="boardName"
				className="form-control"
				placeholder="Board name"
				defaultValue={kanban.name}
			/>
		</div>
		<div className="form-group" onChange={(e) => handleChange(e.target)}>
			{lanes.length ? <label htmlFor="lanesNumber">Lanes</label> : null}
			{lanes.map((lane, idx) => <NewLane key={idx} id={idx} lane={lane} handleChange={handleChange}/>)}
		</div>
		<button
			onClick={handleAddLane}
			className="btn btn-primary"
		>Add lane</button>
		<div className="form-group">
			<label htmlFor="boardDescription">Description</label>
			<textarea
				className="form-control"
				name="boardDescription"
				id="boardDescription"
				rows="3"
			></textarea>
		</div>
		<div className="form-group">
			{Object.keys(priority).map((name, idx) =>
				<Priority key={idx} name={name} color={priority[name]} handleColorChange={handleColorChange} />
			)}
		</div>
		<button onClick={handleSave} className="btn btn-success">Create board</button>
	</form>
);

export default BoardForm;
