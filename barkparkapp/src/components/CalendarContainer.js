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
		remainingSlots,
		currentSlots,
		events,
		userData,
		handleSelectEvent,
		handleNewEvent,
		setEvents,
		onLogout,
	} = props;

	useEffect(() => {
		if (events.length === 0) {
			appService.subscribeToEvents((events) => {
				console.log('we are here'); // eslint-disable-line no-console
				setEvents(events);
			});
		}
	});

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
