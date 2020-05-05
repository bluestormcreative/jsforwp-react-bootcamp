import React, { Component } from 'react';
import SimpleStorage from 'react-simple-storage';
import firebase from './firebase';
import Login from './components/Login';
import { Calendar, momentLocalizer } from 'react-big-calendar';
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
			petNames: ['Leo', 'Lucy'],
			reservedSlots: [],
			availSlots: 3,
		},
		isAuthenticated: false,
	};

	onLogin = (userEmail, userPass) => {
		firebase
			.auth()
			.signInWithEmailAndPassword(userEmail, userPass)
			.then((user) => this.setState({ isAuthenticated: true }))
			.catch((error) => console.error(error));
	};

	handleSelect = ({ slots, start, end }) => {
		// Destructured from slotInfo.
		const { events, userData } = this.state;

		const now = new Date();

		// Return if the timeslot is past.
		if (start.getTime() < now.getTime()) {
			alert(`That time has past!`);
			return;
		}

		// TODO: return if timeslot is taken by someone else, edit if reserved by current user.
		//
		// Return if timeslot is already taken.
		// const takenSlots = events.map((event) => {
		// 	let startTime = event.start.getTime();
		// 	return startTime;
		// });
		// if (takenSlots.includes(start.getTime())) {
		// 	alert("That time is already reserved! Please choose another timeslot.");
		// 	return;
		// }

		// Return if the user tries to select a longer timeslot.
		// TODO try to disable select by drag so we don't need this...
		if (slots.length > 2) {
			alert(`Sorry, only 30 minute slots allowed!`);
			return;
		}

		// Return if user has already reserved all their available slots.
		if (userData.reservedSlots.length > userData.availSlots - 1) {
			alert(
				`Sorry, you've already reserved ${userData.availSlots} timeslots this week!`
			);
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
							slotID,
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
						slotID,
					},
				],
			});
		}
	};

	render() {
		const remainingSlots =
			this.state.userData.availSlots -
			this.state.userData.reservedSlots.length;

		let currentSlots = this.state.userData.reservedSlots.map((obj) => {
			const dayDate = moment(obj.start).format('ddd MMM Do');
			const startTime = moment(obj.start).format('h:mma');
			const endTime = moment(obj.end).format('h:mma');
			return (
				<li>
					<span>{dayDate}:</span>
					<span>
						{startTime} - {endTime}
					</span>
				</li>
			);
		});

		if (currentSlots.length === 0) {
			currentSlots = (
				<li className='no-slots'>
					You haven't reserved any timeslots yet!
				</li>
			);
		}

		return (
			<div className='App'>
				<SimpleStorage parent={this} />
				{!this.state.isAuthenticated && (
					<Login onLogin={this.onLogin} />
				)}
				{this.state.isAuthenticated && (
					<div className='calendar__container'>
						<div className='calendar__header'>
							<div>
								<h2 className='calendar__heading'>
									Bark Park Calendar
								</h2>
								<p className='calendar__description'>
									Click on a 30min timeslot to reserve your
									spot!
								</p>
							</div>
							<div>
								<p>Slots available: {remainingSlots}</p>
								<p>
									Your reserved timeslots:
									<ul>{currentSlots}</ul>
								</p>
							</div>
						</div>
						<Calendar
							localizer={localizer}
							defaultDate={new Date()}
							defaultView='week'
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
				)}
			</div>
		);
	}
}

export default App;
