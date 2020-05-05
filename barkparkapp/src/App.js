import React, { Component } from 'react';
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './App.css';

const localizer = momentLocalizer(moment);

class App extends Component {
	state = {
		events: [],
		userData: {
			id: 489,
			userName: 'Mo',
			userEmail: 'mo@twobigdogs.us',
			userPhone: '665-567-7890',
			petNames: [
				'Leo',
				'Lucy',
			],
			reservedSlots: [],
			availSlots: 3,
		},
	};

	handleSelect = ({ slots, start, end }) => { // Destructured from slotInfo.
		const {
			events,
			userData,
		} = this.state;

		const now = new Date();

		// Return if the timeslot is past.
		if (start.getTime() < now.getTime()) {
			return;
		}

		// Return if the user tries to select a longer timeslot.
		// TODO try to disable select by drag so we don't need this...
		if (slots.length > 2) {
			alert("Sorry, only 30 minute slots allowed!");
			return;
		}

		// Return if user has already reserved all their available slots.
		if (userData.reservedSlots.length > userData.availSlots - 1 ) {
			alert(`Sorry, you've already reserved ${userData.availSlots} timeslots this week!`);
			return;
		}

		// Temp title info - the conditional will be a bool in final v.
		const title = `${userData.userName} & ${userData.petNames[0]}`;

		if (title) {
			const slotID = uuidv4();
			this.setState({
				userData: {
					...userData,
					reservedSlots: [
						...userData.reservedSlots,
						{
							start,
							end,
							title,
							slotID
						},
					],
				},
			});
			this.setState({
				events: [
					...events,
					{
						start,
						end,
						title,
						slotID
					},
				],
			});
		}
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
						views={['week']}
						min={moment('06:00am', 'h:mma').toDate()}
						max={moment('09:00pm', 'h:mma').toDate()}
					/>
				</div>
			</div>
		);
	}
}

export default App;
