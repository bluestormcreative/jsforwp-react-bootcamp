import React from 'react';
import SelectedEventDialog from './SelectedEventDialog';
import Button from './Button';

const Modal = (props) => {
	if (!props.modalOpen) {
		return null;
	}

	return (
		<div className='overlay'>
			<div className='modal'>
				<Button
					className='btn btn--small modal__close'
					onClick={props.toggleModal}
					text='Close'
				/>
				<div className='modal__content'>
					{props.modalContent === 'delete' && (
						<SelectedEventDialog
							selectedEvent={props.selectedEvent}
							toggleModal={props.toggleModal}
							formatTime={props.formatTime}
							deleteEvent={props.deleteEvent}
						/>
					)}
					{props.modalContent === 'expired' && (
						<h3 className='modal__title warning'>
							You can no longer edit that timeslot.
						</h3>
					)}

					{props.modalContent === 'none-left' && (
						<h3 className='modal__title warning'>
							Sorry! You've already reserved all your slots this
							week!
						</h3>
					)}

					{props.modalContent === 'slot-length' && (
						<h3 className='modal__title warning'>
							Sorry! Only 30min timeslots allowed.
						</h3>
					)}

					{props.modalContent === 'notallowed' && (
						<h3 className='modal__title warning'>
							That slot is taken. Please choose another time!
						</h3>
					)}
				</div>
			</div>
		</div>
	);
};
export default Modal;
