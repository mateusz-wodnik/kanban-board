import React from 'react';

const NewLane = ({ lane, id }) => (
	<fieldset id={id} className="input-group mb-3">
		<div className="input-group-prepend">
			<div className="input-group-text">
				<input
					name="active"
					type="checkbox"
					aria-label="Checkbox for following text input"
					defaultChecked={!lane.active}
				/>
			</div>
		</div>
		<input
			name="name"
			type="text"
			className="form-control"
			placeholder="Lane name"
			defaultValue={lane.name}
			aria-label="Text input with checkbox"
		/>
		<div className="input-group-prepend">
			<div className="input-group-text">
				<input
					name="color"
					type="color"
				/>
			</div>
		</div>
	</fieldset>
);

export default NewLane;
