import React from 'react';
import './footer.css';

export default class Footer extends React.Component {
	copyright = () => {
		const date = new Date();
		const year = date.getFullYear();
		return year;
	};
	render() {
		return (
			<footer className='site-footer'>
				<p className='copyright'>Copyright &copy; {this.copyright()}</p>
			</footer>
		);
	}
}
