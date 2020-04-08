import React from 'react';

const Heading = (props) => {
	// State becomes props here...
	return <h2>{props.count}</h2>;
};

const Button = (props) => {
	return <button onClick={props.onClick}>{props.buttonText}</button>;
};

const Counter = (props) => {
	return (
		<>
			<Heading count={props.count} />
			<Button onClick={props.increment} buttonText='Increment Me!' />
			<Button onClick={props.decrement} buttonText='Decrement Me!' />
			<Button onClick={props.reset} buttonText='Reset Me!' />
		</>
	);
};

export default class PracticeCounter extends React.Component {
	state = {
		count: 0,
	};

	incrementCount = () => {
		// Why does 'this' work inside this arrow function?
		this.setState({ count: this.state.count + 1 });
	};

	decrementCount = () => {
		this.setState({ count: this.state.count - 1 });
	};

	resetCount = () => {
		this.setState({ count: 0 });
	};

	render() {
		return (
			<>
				<Counter
					count={this.state.count}
					increment={this.incrementCount}
					decrement={this.decrementCount}
					reset={this.resetCount}
				/>
			</>
		);
	}
}
