import React from 'react';
import Overlay from '../Overlay';

export default class Header extends React.Component {
	render() {
		return (
			<>
				<Overlay formSubmit={this.props.formSubmit} />
				<header className='site-header'>
					<h2 className='site-title'>Simple State Site</h2>
				</header>
			</>
		);
	}
}
