import React from 'react';
import Header from './components/Header';
import Content from './components/Content';
import Footer from './components/Footer';
import './App.css';

const submitName = (event) => {
	event.preventDefault();
	console.log('submitted!');
};

class App extends React.Component {
	state = {
		username: '',
		loginCount: 0,
	};
	render() {
		return (
			<div className='App'>
				<Header formSubmit={submitName} />
				<Content />
				<Footer />
			</div>
		);
	}
}

export default App;
