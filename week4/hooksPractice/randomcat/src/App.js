import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
	const [catUrl, setCatUrl] = useState('');
	const url = 'https://api.thecatapi.com/v1/images/search?size=full';

	const fetchKitteh = () => {
		fetch(url)
			.then((response) => response.json())
			.then((catPic) => {
				setCatUrl(catPic[0]['url']);
			})
			.catch((error) => console.error(error));
	};

	const refreshCat = () => {
		fetchKitteh();
	};

	useEffect(() => {
		if (catUrl.length === 0) {
			fetchKitteh();
		}
	});

	return (
		<div className='App'>
			<>
				{catUrl && (
					<img className='kitteh' src={catUrl} alt='Pretty Kitty' />
				)}
				<button className='button' onClick={refreshCat}>
					New Kitteh Pleez
				</button>
			</>
		</div>
	);
}

export default App;
