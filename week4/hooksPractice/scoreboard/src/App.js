import React, { useState } from 'react';

const Scoreboard = () => {
	const [team1Points, setTeam1Points] = useState(0);
	const [team2Points, setTeam2Points] = useState(0);

	const incrementTeam1 = () => {
		setTeam1Points(team1Points + 1);
	};

	const incrementTeam2 = () => {
		setTeam2Points(team2Points + 1);
	};

	const resetPoints = () => {
		setTeam2Points(0);
		setTeam1Points(0);
	};

	return (
		<>
			<table>
				<thead>
					<tr>
						<th>Team 1</th>
						<th>Team 2</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{team1Points}</td>
						<td>{team2Points}</td>
					</tr>
				</tbody>
			</table>
			<button onClick={incrementTeam1}>Team 1 Scores!</button>
			<button onClick={incrementTeam2}>Team 2 Scores!</button>
			<br />
			<button onClick={resetPoints}>Reset</button>
		</>
	);
};

function App() {
	return (
		<div className='App'>
			<Scoreboard />
		</div>
	);
}

export default App;
