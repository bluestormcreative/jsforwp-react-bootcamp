import React from 'react';
import Button from '../Button';
import './form.css';

export default class Form extends React.Component {
	render() {
		return (
			<form className={this.props.className} onSubmit={this.props.formSubmit}>
				<label htmlFor='name'>Enter your name</label>
				<input type='text' name='name' placeholder='Cool Guest' />
				<Button
					buttonType='submit'
					className='button button--submit'
					buttonText='Log In'
					name='submit'
				/>
			</form>
		);
	}
}
