import React from 'react';

export default class Form extends React.Component {
	render() {
		return (
			<form className={this.props.className} onSubmit={this.props.formSubmit}>
				<label htmlFor='name'>Enter your name</label>
				<input type='text' name='name' placeholder='Cool Guest' />
				<button type='submit' name='submit'>
					Log In
				</button>
			</form>
		);
	}
}
