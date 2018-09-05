import React from 'react';

const Login = ({handleLogin}) => (
	<form className="auth__form" onSubmit={handleLogin}>
		<header>
			<h2>Login</h2>
		</header>
		<div className="form-group">
			<input
				type="email"
				className="form-control"
				id="email"
				name="email"
				placeholder="Email"
				required="true"
			/>
			<input
				type="password"
				className="form-control"
				id="password"
				name="password"
				placeholder="Password"
				required="true"
			/>
		</div>
		<button className="btn btn-primary" type="submit">Submit</button>
	</form>
);

export default Login;
