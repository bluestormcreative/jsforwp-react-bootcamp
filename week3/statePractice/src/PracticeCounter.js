import React from 'react';
import './counter-styles.css';

const Heading = (props) => {
	// State becomes props here...
	return <h2>{props.count}</h2>;
};

const Button = (props) => {
	// className needs to be set as a prop here, interesting...
	return (
		<button className={props.className} onClick={props.onClick}>
			{props.buttonText}
		</button>
	);
};

const Counter = (props) => {
	return (
		<div className='counter'>
			<Heading count={props.count} />
			<Button
				className='button button--inc'
				onClick={props.increment}
				buttonText='Increment Me!'
			/>
			<Button
				className='button button--dec'
				onClick={props.decrement}
				buttonText='Decrement Me!'
			/>
			<Button
				className='button button--reset'
				onClick={props.reset}
				buttonText='Reset Me!'
			/>
		</div>
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
