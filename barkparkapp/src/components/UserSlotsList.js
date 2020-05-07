import React from 'react';

const UserSlotsList = (props) => {
	const { formatTime, userData } = props;

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
		<div className='userslots'>
			<p className='userslots__remaining'>
				Timeslots available: {remainingSlots}
			</p>
			<p className='userslots__reserved'>Your reserved timeslots:</p>
			<ol className='userslots__list'>{currentSlots}</ol>
		</div>
	);
};
export default UserSlotsList;
