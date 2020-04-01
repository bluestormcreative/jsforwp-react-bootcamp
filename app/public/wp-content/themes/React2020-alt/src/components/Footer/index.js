const { Component } = wp.element;
// import './footer.scss';

const date = new Date();
const year = date.getFullYear();

export default class Footer extends Component {
	render() {
		return <footer className='site-footer'>&copy; Copyright {year}</footer>;
	}
}
