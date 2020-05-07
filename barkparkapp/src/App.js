import React, { Component } from 'react';
import firebase from './firebase';
import { v4 as uuidv4 } from 'uuid';
import QRCode from 'qrcode.react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import Login from './components/Login';
import Modal from './components/Modal';
import UserSlotsList from './components/UserSlotsList';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import './App.css';

const localizer = momentLocalizer(moment);
const dayLayoutAlgorithm = 'no-overlap';

class App extends Component {
	state = {
		events: [],
		userData: {
			id: 't9UOnZMj9ib65zlR47YFMQ9WTx22',
			userName: 'Mo',
			userEmail: '',
			userPhone: '665-567-7890',
			petNames: ['Leo', 'Lucy'],
			reservedSlots: [],
			availSlots: 3,
		},
		isAuthenticated: true,
		modalOpen: false,
		modalContent: '',
		selectedEvent: {},
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
				console.log(user); // eslint-disable-line no-console
				this.setState({
					userData: {
						...this.state.userData,
						id: user.user.uid,
						userEmail: user.user.email,
					},
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
			const qrValue = uuidv4();
			const newEvent = {
				key: null,
				start: start.toString(),
				end: end.toString(),
				title,
				userID: userData.id,
				qrValue: qrValue,
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
		this.setState({
			modalOpen: true,
			modalContent: 'delete',
			selectedEvent: event,
		});
	};

		/**
	 * Toggle an active modal.
	 */
	toggleModal = () => {
		this.setState({
			modalOpen: ! this.state.modalOpen,
			modalContent: this.state.modalContent || '',
			selectedEvent: this.state.selectedEvent || {},
		});
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
					userID: this.state.userData.id,
					qrValue: events[event].qrValue,
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

	/**
	 * Format time data from an event object.
	 */
	formatEventTime = (obj) => {
		if (typeof obj !== 'object' ) {
			return null;
		}

		let eventTime = [];
			const key = moment(obj.start);
			eventTime['eventKey'] = key;
			eventTime['day'] = key.format('ddd');
			eventTime['date'] = key.format('MMM Do');
			eventTime['start'] = key.format('h:mma');
			eventTime['end'] = moment(obj.end).format('h:mma');

		return eventTime;
	};

	render() {
		const remainingSlots =
			this.state.userData.availSlots -
			this.state.userData.reservedSlots.length;

		let currentSlots = this.state.userData.reservedSlots.map((obj) => {

			const eventTime = this.formatEventTime(obj);

			return (
				<li key={eventTime['eventKey']}>
					<span className='day'>{eventTime['day']}</span>
					<span className='date'>{eventTime['date']}</span>
					<span className='times'>
						{eventTime['start']} - {eventTime['end']}
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
				{this.state.isAuthenticated ? (
					<>
					<Modal
						modalOpen={this.state.modalOpen}
						modalContent={this.state.modalContent}
						selectedEvent={this.state.selectedEvent}
						toggleModal={this.toggleModal}
						formatTime={this.formatEventTime}
					/>
						<div className='calendar__container'>
							<div className='calendar__header'>
								<div className='header__column'>
									<h2 className='calendar__heading'>
										Bark Park Calendar
									</h2>
									<p>
										Click on a 30min timeslot to reserve it!
									</p>
									<p>
										Each timeslot will generate a QR code to open the lock on the gate at that time.
									</p>
									<p>To release a timeslot, click on it again and confirm to delete it form the calendar.</p>
								</div>
								<div className='header__column'>
									<button
										className='btn btn--logout'
										onClick={(event) => {
											event.preventDefault();
											this.onLogout();
										}}>
										Logout
									</button>
									<UserSlotsList
										remainingSlots={remainingSlots}
										currentSlots={currentSlots}
									/>
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
								dayLayoutAlgorithm={dayLayoutAlgorithm}
							/>
						</div>
					</>
				) : (
					<Login onLogin={this.onLogin} />
				)}
			</div>
		);
	}
}

export default App;
