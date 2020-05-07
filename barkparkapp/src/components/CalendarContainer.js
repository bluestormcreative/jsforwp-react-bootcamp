import React, { useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import UserSlotsList from './UserSlotsList';

import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);
const dayLayoutAlgorithm = 'no-overlap';

const CalendarContainer = (props) => {
	const {
		appService,
		events,
		userData,
		handleSelectEvent,
		handleNewEvent,
		setEvents,
		onLogout,
		formatTime,
	} = props;

	useEffect(() => {
		if (events.length === 0) {
			appService.subscribeToEvents((events) => {
				setEvents(events);
			});
		}
	});

	const getReservedSlots = () => {
		if (userData.availSlots && userData.reservedSlots.length) {
			return userData.availSlots - userData.reservedSlots.length;
		}
		return null;
	};

	const remainingSlots = getReservedSlots();
	let currentSlots = userData.reservedSlots.map((obj) => {
		const now = new Date();
		const eventTime = formatTime(obj);
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
		<div className='calendar__container'>
			<div className='calendar__header'>
				<div className='header__column'>
					<h2 className='calendar__heading'>Bark Park Calendar</h2>
					<p>Click on a 30min timeslot to reserve it!</p>
					<p>
						Each timeslot will generate a QR code to open the lock
						on the gate at that time.
					</p>
					<p>
						To release a timeslot, click on it again and confirm to
						delete it form the calendar.
					</p>
				</div>
				<div className='header__column'>
					<button
						className='btn btn--logout'
						onClick={(event) => {
							event.preventDefault();
							onLogout();
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
				events={events}
				onSelectSlot={handleNewEvent}
				selectable
				step={30}
				showMultiDayTimes
				views={['week']}
				min={moment('06:00am', 'h:mma').toDate()}
				max={moment('09:00pm', 'h:mma').toDate()}
				onSelectEvent={handleSelectEvent}
				currentUser={userData.id}
				dayLayoutAlgorithm={dayLayoutAlgorithm}
			/>
		</div>
	);
};
export default CalendarContainer;
