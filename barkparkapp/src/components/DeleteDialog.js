import React from 'react';
import firebase from '../firebase';
import moment from 'moment';

import Button from './Button';

const DeleteDialog = (props) => {

    const {
        selectedEvent,
        toggleModal,
    } = props;

    const startTime = moment(selectedEvent.start).format('h:mma');
    const endTime = moment(selectedEvent.end).format('h:mma');

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
            <h2 className='modal__title'>{startTime} - {endTime}</h2>
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
