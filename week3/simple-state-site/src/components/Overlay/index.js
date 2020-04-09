import React from 'react';
import Form from '../Form';

export default class Overlay extends React.Component {
	render() {
		return (
			<div className='overlay'>
				<Form className='form form--login' formSubmit={this.props.formSubmit} />
			</div>
		);
	}
}
