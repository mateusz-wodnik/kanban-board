import React from 'react';

const Register = ({handleRegister}) => (
	<form className="auth__form" onSubmit={handleRegister}>
		<header>
			<h2>Register</h2>
		</header>
		<div className="form-group">
			<input
				type="text"
				className="form-control"
				id="username"
				name="username"
				placeholder="Username"
				required={true}
			/>
		</div>
		<div className="form-group">
			<input
				type="text"
				className="form-control"
				id="firstname"
				name="firstname"
				placeholder="First name"
				required={true}
			/>
			<input
				type="text"
				className="form-control"
				id="lastname"
				name="lastname"
				placeholder="Last name"
				required={true}
			/>
		</div>
		<div className="form-group">
			<input
				type="email"
				className="form-control"
				id="email"
				name="email"
				aria-describedby="emailHelp"
				placeholder="Enter email"
				required={true}
			/>
			<small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
		</div>
		<div className="form-group">
			<input
				type="password"
				className="form-control"
				id="password"
				name="password"
				placeholder="Password"
				required={true}
			/>
			<input
				type="password"
				className="form-control"
				id="passwordconfirm"
				name="passwordconfirm"
				placeholder="Confirm password"
				required={true}
			/>
		</div>
		<button type="submit" className="btn btn-primary">Submit</button>
	</form>
);

export default Register;
