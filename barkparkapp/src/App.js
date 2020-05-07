import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import firebase from './firebase';

import CalendarContainer from './components/CalendarContainer';
import Login from './components/Login';
import Modal from './components/Modal';

import './App.css';

function App(props) {
	const [events, setEvents] = useState([]);
	const [userData, setUserData] = useState({});
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [modalContent, setModalContent] = useState('');
	const [selectedEvent, setSelectedEvent] = useState({});

	const { appService } = props;

	/**
	 * Authenticate on login
	 *
	 * return void
	 */
	const onLogin = (email, password) => {
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then((response) => {
				const userInfo = appService.getUserData(response.user);
				userInfo.then((data) => {
					setUserData({
						...data,
						email: response.user['email'],
						id: response.user['uid'],
					});
					setIsAuthenticated(true);
				});
			})
			.catch((error) => console.error(error));
	};

	/**
	 * Logout function.
	 *
	 * return void
	 */
	const onLogout = () => {
		appService
			.logout()
			.then(() => {
				setIsAuthenticated(false);
			})
			.catch((error) => console.error(error));
	};

	/**
	 * Get previous sibling elements that match a selector.
	 */
	const getPrevSiblings = (elem, selector) => {
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
	 * Add class selector to past day columns.
	 */
	const shadePastDays = () => {
		const today = document.querySelector('.rbc-day-slot.rbc-today');

		if (!today) {
			return;
		}

		const dayCols = getPrevSiblings(today, '.rbc-day-slot');
		for (const day of dayCols) {
			day.classList.add('past-day');
		}
	};

	/**
	 * Verify a new event can be created in the selected slot.
	 *
	 * return bool
	 */
	const checkIfEventCanBeCreated = (slots, start, reserved, avail) => {
		const now = new Date();

		// Return if the timeslot is past.
		if (start.getTime() < now.getTime()) {
			setModalContent('expired');
			setModalOpen(true);
			return false;
		}

		// Return if the user tries to select a longer timeslot.
		// TODO try to disable select by drag so we don't need this...
		if (slots.length > 2) {
			setModalContent('slotLength');
			setModalOpen(true);
			return false;
		}

		// Return if user has already reserved all their available slots.
		if (reserved.length > avail - 1) {
			setModalContent('noneLeft');
			setModalOpen(true);
			return false;
		}

		return true;
	};

	/**
	 * Create a new event associated with the selected slot.
	 */
	const handleNewEvent = ({ slots, start, end }) => {
		const canCreateEvent = checkIfEventCanBeCreated(
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

			delete newEvent.key;
			appService.saveNewEvent(newEvent);
			setUserData({
				...userData,
				reservedSlots: [...userData.reservedSlots, newEvent],
			});
		}
	};

	const updateUserData = (selectedEvent) => {
		console.log(selectedEvent); // eslint-disable-line no-console
		const newReservedSlots = userData.reservedSlots.filter((item) => {
			console.log(item); // eslint-disable-line no-console
			return item.qrValue !== selectedEvent.qrValue;
		});
		console.log(newReservedSlots); // eslint-disable-line no-console
		// const userRef = firebase.database().ref('users/' + userData.id);
		// userRef.update({
		// 	...userData,
		// 	reservedSlots: [...newReservedSlots],
		// });
		setUserData({
			...userData,
			reservedSlots: [...newReservedSlots],
		});
	};

	/**
	 * Logic for a selected event.
	 */
	const handleSelectEvent = (event) => {
		const now = new Date();
		let contentFlag = 'delete';

		if (event.start.getTime() < now.getTime()) {
			contentFlag = 'expired';
		}

		if (event.userID !== userData.id) {
			contentFlag = 'notAllowed';
		}

		setModalContent(contentFlag);
		setModalOpen(true);
		setSelectedEvent(event);
	};

	/**
	 * Toggle an active modal.
	 */
	const toggleModal = () => {
		setModalContent(modalContent);
		setModalOpen(!modalOpen);
		setSelectedEvent(selectedEvent);
	};

	/**
	 * Format time data from an event object.
	 */
	const formatEventTime = (obj) => {
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
	useEffect(() => {
		shadePastDays();
	});

	return (
		<div className='App'>
			{isAuthenticated ? (
				<>
					<Modal
						modalOpen={modalOpen}
						modalContent={modalContent}
						selectedEvent={selectedEvent}
						toggleModal={toggleModal}
						formatTime={formatEventTime}
						userData={userData}
						setUserData={setUserData}
						appService={appService}
						updateUserData={updateUserData}
					/>
					<CalendarContainer
						appService={appService}
						events={events}
						userData={userData}
						handleSelectEvent={handleSelectEvent}
						handleNewEvent={handleNewEvent}
						onLogout={onLogout}
						setEvents={setEvents}
						setUserData={setUserData}
						formatTime={formatEventTime}
					/>
				</>
			) : (
				<Login onLogin={onLogin} />
			)}
		</div>
	);
}

export default App;
