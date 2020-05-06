import React, { Component } from 'react';
import firebase from './firebase';
// import SimpleStorage from 'react-simple-storage';
import Login from './components/Login';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './App.css';

const localizer = momentLocalizer(moment);

class App extends Component {
	state = {
		events: [],
		userData: {
			id: null,
			userName: 'Mo',
			userEmail: '',
			userPhone: '665-567-7890',
			petNames: ['Leo', 'Lucy'],
			reservedSlots: [],
			availSlots: 3,
		},
		isAuthenticated: false,
	};

	/**
	 * Authenticate with database on login
	 *
	 * return void
	 */
	onLogin = (userEmail, userPass) => {
		firebase
			.auth()
			.signInWithEmailAndPassword(userEmail, userPass)
			.then((user) => {
				this.setState({
					isAuthenticated: true,
				});
			})
			.catch((error) => console.error(error));
	};

	/**
	 * Logout function.
	 *
	 * return void
	 */
	onLogout = () => {
		firebase
			.auth()
			.signOut()
			.then(() => {
				this.setState({ isAuthenticated: false });
			})
			.catch((error) => console.error(error));
	};

	/**
	 * Verify a new event can be created in the selected slot.
	 *
	 * return bool
	 */
	checkIfEventCanBeCreated = (slots, start, reserved, avail) => {
		const now = new Date();

		// Return if the timeslot is past.
		if (start.getTime() < now.getTime()) {
			alert(`That time has past!`);
			return false;
		}

		// Return if the user tries to select a longer timeslot.
		// TODO try to disable select by drag so we don't need this...
		if (slots.length > 2) {
			alert(`Sorry, only 30 minute slots allowed!`);
			return false;
		}

		// Return if user has already reserved all their available slots.
		if (reserved.length > avail - 1) {
			alert(
				`Sorry, you've already reserved ${avail} timeslots this week!`
			);
			return false;
		}

		return true;
	};

	/**
	 * Create a new event associated with the selected slot.
	 */
	handleNewEvent = ({ slots, start, end }) => {
		const { userData } = this.state;

		const canCreateEvent = this.checkIfEventCanBeCreated(
			slots,
			start,
			userData.reservedSlots,
			userData.availSlots
		);

		const wantCreateEvent = true; // TODO Update this with user confirmation modal.

		if (canCreateEvent && wantCreateEvent) {
			const title = `${userData.userName} & ${userData.petNames[0]}`;
			const newEvent = {
				key: null,
				start: start.toString(),
				end: end.toString(),
				title,
				//userID: userData.id,
			};
			this.setState({
				userData: {
					...userData,
					reservedSlots: [...userData.reservedSlots, newEvent],
				},
			});

			const eventsRef = firebase.database().ref('events');
			delete newEvent.key;
			eventsRef.push(newEvent);
		}
	};

	/**
	 * Delete a selected event.
	 */
	handleSelectEvent = (event) => {
		if (window.confirm('Delete this event?')) {
			const eventRef = firebase.database().ref('events/' + event.key);
			eventRef.remove();
		}
	};

	/**
	 * Update state from data source after component mounted.
	 */
	componentDidMount() {
		const eventsRef = firebase.database().ref('events');

		eventsRef.on('value', (snapshot) => {
			const events = snapshot.val();
			const newStateEvents = [];
			for (let event in events) {
				newStateEvents.push({
					key: event,
					start: new Date(events[event].start),
					end: new Date(events[event].end),
					title: events[event].title,
					// userID
				});
			}
			this.setState({
				events: newStateEvents,
				userData: {
					...this.state.userData,
					reservedSlots: [...newStateEvents],
				},
			});
		});
	}

	render() {
		const remainingSlots =
			this.state.userData.availSlots -
			this.state.userData.reservedSlots.length;

		let currentSlots = this.state.userData.reservedSlots.map((obj, i) => {
			const upcoming = moment(obj.start);
			const dayDate = upcoming.format('ddd MMM Do');
			const startTime = upcoming.format('h:mma');
			const endTime = moment(obj.end).format('h:mma');
			return (
				<li key={upcoming}>
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
		} else {
			currentSlots.sort((a, b) => a.key - b.key);
		}

		return (
			<div className='App'>
				{/* <SimpleStorage parent={this} /> */}
				{this.state.isAuthenticated ? (
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
								<button
									className='btn btn--logout'
									onClick={(event) => {
										event.preventDefault();
										this.onLogout();
									}}>
									Logout
								</button>
								<p>Slots available: {remainingSlots}</p>
								<p>Your reserved timeslots:</p>
								<ul>{currentSlots}</ul>
							</div>
						</div>
						<Calendar
							localizer={localizer}
							defaultDate={new Date()}
							defaultView='week'
							events={this.state.events}
							onSelectSlot={this.handleNewEvent}
							selectable
							step={30}
							showMultiDayTimes
							views={['week']}
							min={moment('06:00am', 'h:mma').toDate()}
							max={moment('09:00pm', 'h:mma').toDate()}
							onSelectEvent={this.handleSelectEvent}
							currentUser={this.state.userData.id}
						/>
					</div>
				) : (
					<Login onLogin={this.onLogin} />
				)}
			</div>
		);
	}
}

export default App;
