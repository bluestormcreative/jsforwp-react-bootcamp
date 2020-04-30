import React from 'react';
import { Link } from 'react-router-dom';

// Functional component with implicit return...
const Header = (props) => (
	<header className='App-header'>
		<ul className='container'>
			<li>React Explained - Post CRUD Project</li>
			<li key='home'>
				<Link to='/'>Site Home</Link>
			</li>
			{props.isAuthenticated ? (
				<li>
					<Link to='/new'>New Post</Link>
				</li>
			) : (
				<li>
					<Link to='/login'>Login</Link>
				</li>
			)}
		</ul>
	</header>
);
export default Header;
