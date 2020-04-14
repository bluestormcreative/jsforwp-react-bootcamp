import React, { useState } from 'react';

function App() {
	const [count, setCount] = useState(0);

	const incrementCount = () => {
		setCount(count + 1);
	};

	const resetCount = () => {
		setCount(0);
	};

	return (
		<div className='App'>
			<h1>{count}</h1>
			<button onClick={incrementCount}>Count Up!</button>
			<button onClick={resetCount}>Reset!</button>
		</div>
	);
}

export default App;
