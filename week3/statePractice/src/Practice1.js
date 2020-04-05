import React from 'react';

class Practice1 extends React.Component {
	/* 
    1. Create a state object
    2. Create a username property with a value of some username
  */
	state = {
		username: `bluestormcreative`,
	};
	render() {
		return <p>{this.state.username}</p>;
	}
}

export default Practice1;
