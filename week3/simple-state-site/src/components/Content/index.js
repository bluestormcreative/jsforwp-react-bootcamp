import React from 'react';
import Button from '../Button';
import './content.css';

const Content = (props) => {
	const { loginCount, greeting, visitAgain } = props;
	return (
		<div className='site-content'>
			<h3>Hello, {greeting}!</h3>
			<p className='count-msg'>You have visited {loginCount} times.</p>
			<hr />
			<Button
				buttonType='button'
				className='button button--again'
				buttonText='Visit again?'
				onClick={visitAgain}
			/>
		</div>
	);
};
export default Content;
