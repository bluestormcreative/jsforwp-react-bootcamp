import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
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
			id: '',
			userName: 'Mo',
			userEmail: '',
			petNames: ['Lucy', 'Leo'],
			reservedSlots: [],
			availSlots: 3,
		},
		isAuthenticated: false,
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
		this.props.appService
			.login(userEmail, userPass)
			.then((user) => {
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
		this.props.appService
			.logout()
			.then(() => {
				this.setState({ isAuthenticated: false });
			})
			.catch((error) => console.error(error));
	};

	/**
	 * Add class selector to past day columns.
	 */
	shadePastDays = () => {
		const today = document.querySelector('.rbc-day-slot.rbc-today');

		if (!today) {
			return;
		}

		const dayCols = this.getPrevSiblings(today, '.rbc-day-slot');
		for (const day of dayCols) {
			day.classList.add('past-day');
		}
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
			this.setState({
				modalContent: 'expired',
				modalOpen: true,
			});
			return false;
		}

		// Return if the user tries to select a longer timeslot.
		// TODO try to disable select by drag so we don't need this...
		if (slots.length > 2) {
			this.setState({
				modalContent: 'slot-length',
				modalOpen: true,
			});
			return false;
		}

		// Return if user has already reserved all their available slots.
		if (reserved.length > avail - 1) {
			this.setState({
				modalContent: 'none-left',
				modalOpen: true,
			});
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

		if (canCreateEvent) {
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

			delete newEvent.key;
			this.props.appService.saveNewEvent(newEvent);
		}
	};

	/**
	 * Delete a selected event.
	 */
	handleSelectEvent = (event) => {
		const now = new Date();
		let contentFlag = 'delete';

		if (event.start.getTime() < now.getTime()) {
			contentFlag = 'expired';
		}

		if (event.userID !== this.state.userData.id) {
			contentFlag = 'notallowed';
		}

		this.setState({
			modalOpen: true,
			modalContent: contentFlag,
			selectedEvent: event,
		});
	};

	/**
	 * Toggle an active modal.
	 */
	toggleModal = () => {
		this.setState({
			modalOpen: !this.state.modalOpen,
			modalContent: this.state.modalContent,
			selectedEvent: this.state.selectedEvent,
		});
	};

	/**
	 * Get previous sibling elements that match a selector.
	 */
	getPrevSiblings = (elem, selector) => {
		let sibling = elem.previousElementSibling;
		let allSiblings = [];

		// If the sibling matches our selector, use it
		// If not, jump to the next sibling and continue the loop
		while (sibling) {
			if (sibling.matches(selector)) {
				allSiblings.push(sibling);
			}
			sibling = sibling.previousElementSibling;
		}

		return allSiblings;
	};

	/**
	 * Format time data from an event object.
	 */
	formatEventTime = (obj) => {
		if (typeof obj !== 'object') {
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

	/**
	 * Update state from data source after component mounted.
	 */
	componentDidMount() {
		this.props.appService.subscribeToEvents((events) =>
			this.setState({
				events,
				userData: {
					...this.state.userData,
					reservedSlots: [...events],
				},
			})
		);

		this.shadePastDays();
	}

	componentDidUpdate() {
		this.shadePastDays();
	}

	render() {
		const remainingSlots =
			this.state.userData.availSlots -
			this.state.userData.reservedSlots.length;

		let currentSlots = this.state.userData.reservedSlots.map((obj) => {
			const now = new Date();
			const eventTime = this.formatEventTime(obj);
			let listItemClassName = 'userslots__item';

			if (new Date(obj.start).getTime() < now.getTime()) {
				listItemClassName += ' expired-item';
			}

			return (
				<li key={eventTime['eventKey']} className={listItemClassName}>
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
							deleteEvent={this.props.appService.deleteEvent}
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
										Each timeslot will generate a QR code to
										open the lock on the gate at that time.
									</p>
									<p>
										To release a timeslot, click on it again
										and confirm to delete it form the
										calendar.
									</p>
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
