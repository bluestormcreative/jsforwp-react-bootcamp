import React, { useState } from 'react';

import Button from './Button';
import EventQR from './EventQR';

const SelectedEventDialog = (props) => {
	const [confirmDelete, setConfirmDelete] = useState(false);
	const [createQR, setCreateQR] = useState(false);

	const {
		selectedEvent,
		toggleModal,
		formatTime,
		deleteEvent,
		updateUserData,
	} = props;

	const eventTime = formatTime(selectedEvent);

	const deleteTimeslot = () => {
		deleteEvent(selectedEvent);
		updateUserData(selectedEvent);
		toggleModal();
	};

	return (
		<>
			<h2 className='modal__title'>
				{eventTime['day']} {eventTime['date']}
			</h2>
			<h4 className='modal__subtitle'>
				{eventTime['start']} - {eventTime['end']}
			</h4>
			{!confirmDelete && !createQR && (
				<div className='container container--flex'>
					<Button
						className='btn btn--display-qr'
						onClick={() => setCreateQR(true)}
						text='Display timeslot code?'
					/>
					<Button
						className='btn btn--delete'
						onClick={() => setConfirmDelete(true)}
						text='Delete this timeslot?'
					/>
				</div>
			)}
			{confirmDelete && !createQR && (
				<div className='container container--center'>
					<h3 className='delete-confirmation'>
						Are you sure you want to let this timeslot go?
					</h3>
					<Button
						className='btn btn--delete'
						onClick={deleteTimeslot}
						text='Yes! Release the (timeslot) hounds!'
					/>
					<Button
						className='btn btn--linklike'
						onClick={toggleModal}
						text='Nope, I changed my mind.'
					/>
				</div>
			)}
			{!confirmDelete && createQR && (
				<div className='container container--center'>
					<EventQR qrvalue={selectedEvent.qrValue} />
				</div>
			)}
		</>
	);
};
export default SelectedEventDialog;
