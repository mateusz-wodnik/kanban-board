import React from 'react';

const Register = ({handleRegister}) => (
	<form className="register__form w-50">
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
			/>
		</div>
		<div className="form-group">
			<input
				type="text"
				className="form-control"
				id="firstname"
				name="firstname"
				placeholder="First name"
			/>
			<input
				type="text"
				className="form-control"
				id="lastname"
				name="lastname"
				placeholder="Last name"
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
			/>
			<input
				type="password"
				className="form-control"
				id="passwordconfirm"
				name="passwordconfirm"
				placeholder="Confirm password"
			/>
		</div>
		<button
			onClick={handleRegister}
			className="btn btn-primary"
		>Submit</button>
	</form>
);

export default Register;
