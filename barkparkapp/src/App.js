import React, { Component } from 'react';
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './App.css';

const localizer = momentLocalizer(moment);

class App extends Component {
	state = {
		events: [],
		userData: {
			id: 489,
			petNames: [
				'Leo',
				'Lucy',
			],
			userName: 'Mo',
			reservedSlots: [],
		},
	};

	handleSelect = ({ slots, start, end }) => {
		console.log(this.state.userData.reservedSlots.length); // eslint-disable-line no-console

		if (slots.length > 2) {
			alert("Sorry, only 30 minute slots allowed!");
			return;
		}

		if (this.state.userData.reservedSlots.length > 2 ) {
			alert("Sorry, you've already reserved 3 timeslots this week!");
			return;
		}

		const title = `${this.state.userData.userName} & ${this.state.userData.petNames[0]}`; // This can be the username by default.
		// Then just a click "Yes" or "Cancel", then if "Yes"...
		if (title)
			this.setState({
				userData: {
					...this.state.userData,
					reservedSlots: [
						...this.state.userData.reservedSlots,
						{start,
						end,
						title,},
					],
				},
			});
			this.setState({
				events: [
					...this.state.events,
					{
						start,
						end,
						title,
					},
				],
			});
	}

	render() {
		return (
			<div className="App">
				<div className="calendar__container">
					<h2 className="calendar__heading">Bark Park Calendar</h2>
					<p className="calendar__description">Click on a 30min timeslot to reserve your spot!</p>
					<Calendar
						localizer={localizer}
						defaultDate={new Date()}
						defaultView="week"
						events={this.state.events}
						onSelectSlot={this.handleSelect}
						selectable
						step={30}
						showMultiDayTimes
						views={['week', 'day']}
						min={moment('06:00am', 'h:mma').toDate()}
						max={moment('09:00pm', 'h:mma').toDate()}
					/>
				</div>
			</div>
		);
	}
}

export default App;
