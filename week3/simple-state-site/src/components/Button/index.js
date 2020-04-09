import React from 'react';
import './button.css';

const Button = (props) => {
	return (
		<button
			type={props.buttonType}
			className={props.className}
			onClick={props.onClick}>
			{props.buttonText}
		</button>
	);
};
export default Button;
