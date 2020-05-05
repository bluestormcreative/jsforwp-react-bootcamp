import React, { Component } from 'react';

export default class Login extends Component {
	state = {
		userEmail: '',
		userPass: '',
	};

	handleLogin = (event) => {
		event.preventDefault();
		this.props.onLogin(this.state.userEmail, this.state.userPass);
	};

	render() {
		return (
			<form
				className='App__login'
				name='login'
				onSubmit={this.handleLogin}>
				<p>
					<label htmlFor='userEmail'>Email:</label>
					<input
						name='userEmail'
						type='email'
						onChange={(event) =>
							this.setState({ userEmail: event.target.value })
						}
					/>
				</p>
				<p>
					<label htmlFor='userPass'>Password:</label>
					<input
						name='userPass'
						type='password'
						onChange={(event) =>
							this.setState({ userPass: event.target.value })
						}
					/>
				</p>
				<p>
					<button
						type='submit'
						disabled={
							!this.state.userEmail && !this.state.userPass
						}>
						Login
					</button>
				</p>
			</form>
		);
	}
}
