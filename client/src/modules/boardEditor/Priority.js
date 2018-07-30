import React from 'react';

const Priority = ({ name, color, handleColorChange }) => (
	<div className="input-group">
		<div className="input-group-prepend">
			<span className="input-group-text" id="basic-addon1">{name}</span>
		</div>
		<div className="input-group-prepend">
			<div className="input-group-text" style={{background: color}}>
				<input
					onChange={handleColorChange}
					type="color"
					name="priority"
					className="form-control priority"
					id={name}
					aria-label="Username"
					aria-describedby="basic-addon1"
					defaultValue={color}
				/>
			</div>
		</div>
	</div>
)

export default Priority;
