import React, { Component } from 'react';
import './footer.scss';

const date = new Date();
const year = date.getFullYear();

class Footer extends Component {
	render() {
		return <footer className='site-footer'>&copy; Copyright {year}</footer>;
	}
}

export default Footer;
