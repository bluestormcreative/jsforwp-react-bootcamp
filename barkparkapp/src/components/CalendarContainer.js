import React, { useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import UserSlotsList from './UserSlotsList';

import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

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

	const eventStyleGetter = (event, start, end, isSelected) => {
		let newStyle = {
			backgroundColor: 'lightgrey',
			color: 'black',
			borderRadius: "0px",
			border: "none"
		};

		if (event.userID === userData.id){
			newStyle.backgroundColor = 'lightgreen'
		}

		return {
			className: '',
			style: newStyle
		};
	};

	useEffect(() => {
		if (events.length === 0) {
			appService.subscribeToEvents((events) => {
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
						formatTime={formatTime}
						userData={userData}
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
				eventPropGetter={eventStyleGetter}
			/>
		</div>
	);
};
export default CalendarContainer;
