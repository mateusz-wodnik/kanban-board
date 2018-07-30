import React from 'react';

const Login = ({handleLogin}) => (
	<form className="register__form w-50">
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
			/>
			<input
				type="password"
				className="form-control"
				id="password"
				name="password"
				placeholder="Password"
			/>
		</div>
		<button
			onClick={handleLogin}
			className="btn btn-primary"
		>Submit</button>
	</form>
);

export default Login;
