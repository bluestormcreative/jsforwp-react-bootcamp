import React from 'react';

const WarningDialog = (props) => {
	const warnings = {
		expired: `You can no longer edit that timeslot.`,
		noneLeft: `Sorry! You've already reserved ${props.availSlots} slots this
        week!`,
		slotLength: `Sorry! Only 30min timeslots allowed.`,
		notAllowed: `That slot is taken. Please choose another time!`,
	};

	return (
		<div className='container container--flex'>
			<h3 className='modal__title warning'>{warnings[props.type]}</h3>
		</div>
	);
};
export default WarningDialog;
