import React from 'react';

const Content = (props) => {
	const { loginCount, greeting } = props;
	return (
		<div className='site-content'>
			<h3>Hello, {greeting}!</h3>
			<p className='count-msg'>You have visited {loginCount} times.</p>
		</div>
	);
};
export default Content;
