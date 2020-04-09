import React from 'react';
import Header from './components/Header';
import Content from './components/Content';
import Footer from './components/Footer';
import './App.css';

class App extends React.Component {
	state = {
		username: 'Hallowed Guest',
		loginCount: 0,
	};

	submitName = (event) => {
		event.preventDefault();
		const name = document.querySelector('input[name]').value;
		const overlay = document.querySelector('.overlay');
		this.setState({ username: name });
		this.setState({ loginCount: this.state.loginCount + 1 });
		overlay.classList.add('hidden');
	};

	resetOverlay = () => {
		const overlay = document.querySelector('.overlay');
		if (overlay.classList.contains('hidden')) {
			overlay.classList.remove('hidden');
			this.setState({ username: 'Hallowed Guest' });
		}
	};

	render() {
		return (
			<div className='App'>
				<Header formSubmit={this.submitName} />
				<Content
					loginCount={this.state.loginCount}
					greeting={this.state.username}
					visitAgain={this.resetOverlay}
				/>
				<Footer />
			</div>
		);
	}
}

export default App;
