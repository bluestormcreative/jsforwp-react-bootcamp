import React from 'react';
import firebase from '../firebase';

import Button from './Button';

const DeleteDialog = (props) => {

    const {
        selectedEvent,
        toggleModal,
        formatTime,
    } = props;

    const eventTime = formatTime(selectedEvent);

    const displayCode = () => {
        console.log('display code'); // eslint-disable-line no-console
        toggleModal();
    };

    const deleteEvent = () => {
		if (window.confirm('Delete this event?')) {
			const eventRef = firebase.database().ref('events/' + selectedEvent.key);
			eventRef.remove();
		}
        toggleModal();
    };

    return(
        <>
            <h2 className='modal__title'>{eventTime['dayDate']}</h2>
            <h4 className='modal__subtitle'>{eventTime['start']} - {eventTime['end']}</h4>
            <div className="container">
                <Button
                    className="btn btn--display-qr"
                    onClick={displayCode}
                    text="Display event code?"
                />
                <Button
                    className="btn btn--delete"
                    onClick={deleteEvent}
                    text='Delete this event?'
                />
            </div>
        </>
    );
};
export default DeleteDialog;
