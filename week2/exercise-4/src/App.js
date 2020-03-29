import React from 'react';
import logo from './logo.svg';
import Hithere from './Hithere';
import './App.css';

function App() {
	return (
		<div className='App'>
			<header className='App-header'>
				<Hithere />
				<img src={logo} className='App-logo' alt='logo' />
				<p>Week 2 exercise 4!</p>
				<a
					className='App-link'
					href='https://reactjs.org'
					target='_blank'
					rel='noopener noreferrer'>
					Learn React
				</a>
			</header>
		</div>
	);
}

export default App;
