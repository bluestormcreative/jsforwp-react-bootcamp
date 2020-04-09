import React from 'react';

const Content = (props) => {
	const { loginCount, greeting, visitAgain } = props;
	return (
		<div className='site-content'>
			<h3>Hello, {greeting}!</h3>
			<p className='count-msg'>You have visited {loginCount} times.</p>
			<hr />
			<button className='button button--again' onClick={visitAgain}>
				Visit again?
			</button>
		</div>
	);
};
export default Content;
