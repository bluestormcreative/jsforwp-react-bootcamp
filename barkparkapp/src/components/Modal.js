import React from 'react';
import SelectedEventDialog from './SelectedEventDialog';
import WarningDialog from './WarningDialog';
import Button from './Button';

const Modal = (props) => {
	const {
		modalOpen,
		toggleModal,
		modalContent,
		selectedEvent,
		formatTime,
		deleteEvent,
	} = props;

	if (!modalOpen) {
		return null;
	}

	return (
		<div className='overlay'>
			<div className='modal'>
				<Button
					className='btn btn--small modal__close'
					onClick={toggleModal}
					text='Close'
				/>
				<div className='modal__content'>
					{modalContent === 'delete' ? (
						<SelectedEventDialog
							selectedEvent={selectedEvent}
							toggleModal={toggleModal}
							formatTime={formatTime}
							deleteEvent={deleteEvent}
						/>
					) : (
						<WarningDialog type={modalContent} />
					)}
				</div>
			</div>
		</div>
	);
};
export default Modal;
