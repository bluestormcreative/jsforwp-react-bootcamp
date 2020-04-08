import React from 'react';

const Header = (props) => {
	return <h2>{props.count}</h2>;
};

const Button = (props) => {
	return <button onClick={props.onClick}>Increment me!</button>;
};

const Counter = (props) => {
	return (
		<>
			<Header count={props.count} />
			<Button onClick={props.increment} />
		</>
	);
};

export default class PracticeCounter extends React.Component {
	state = {
		count: 0,
	};

	incrementCount = () => {
		this.setState({ count: this.state.count + 1 });
	};

	render() {
		return (
			<>
				<Counter count={this.state.count} increment={this.incrementCount} />
			</>
		);
	}
}
