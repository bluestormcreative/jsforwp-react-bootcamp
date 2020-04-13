import React from 'react';

const Practice1 = () => <Header sitename='React Explained' />;

class Header extends React.Component {
	state = {
		username: 'defaultusername',
	};
	/* 
    1. Call static getDerivedStateFromProps(props, state) {}
    2. Inside of that log out the props and state
    3. Then create a newState object where you override the current username
    4. Return the newState
  */
	static getDerivedStateFromProps(props, state) {
		console.log('prac1 props: ', props);
		console.log('prac1 state: ', state);

		const newState = {
			username: 'barnaby',
		};

		return newState;
	}

	render() {
		return (
			<header>
				<h1>{this.props.sitename}</h1>
				<p>Hi {this.state.username}!</p>
			</header>
		);
	}
}

export default Practice1;
