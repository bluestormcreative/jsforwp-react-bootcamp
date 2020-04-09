import React from 'react';
import Header from './components/Header';
import Content from './components/Content';
import Footer from './components/Footer';
import './App.css';

class App extends React.Component {
	state = {
		username: '',
		loginCount: 0,
	};

	submitName = (event) => {
		event.preventDefault();
		const name = document.querySelector('input[name]').value;
		const overlay = document.querySelector('.overlay');
		this.setState({ name: name });
		this.setState({ loginCount: this.state.loginCount + 1 });
		overlay.classList.add('hidden');
	};

	greeting = () => {
		return this.state.name ? this.state.name : 'Hallowed Guest';
	};
	render() {
		return (
			<div className='App'>
				<Header formSubmit={this.submitName} greeting={this.greeting} />
				<Content loginCount={this.state.loginCount} />
				<Footer />
			</div>
		);
	}
}

export default App;
