const { Component } = wp.element;
// import './header.scss';

export default class Header extends Component {
	render() {
		return (
			<div className='site-header'>
				<h1 className='site-title'>One-page React Site</h1>
				<h3 className='site-description'>Made with create-react-app</h3>
			</div>
		);
	}
}
