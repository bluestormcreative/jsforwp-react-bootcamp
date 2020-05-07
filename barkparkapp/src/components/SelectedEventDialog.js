import React, { useState } from 'react';
import firebase from '../firebase';

import Button from './Button';
import EventQR from './EventQR';

const SelectedEventDialog = (props) => {
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [createQR, setCreateQR] = useState(false);

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
        const eventRef = firebase.database().ref('events/' + selectedEvent.key);
        eventRef.remove();
        toggleModal();
    };

    return(
        <>
            <h2 className='modal__title'>{eventTime['dayDate']}</h2>
            <h4 className='modal__subtitle'>{eventTime['start']} - {eventTime['end']}</h4>
            { ! confirmDelete && ! createQR && (
                <div className='container container--flex'>
                    <Button
                        className="btn btn--display-qr"
                        onClick={() => setCreateQR(true)}
                        text="Display timeslot code?"
                    />
                    <Button
                        className="btn btn--delete"
                        onClick={() => setConfirmDelete(true)}
                        text='Delete this timeslot?'
                    />
                </div>
            )}
            { confirmDelete && ! createQR && (
                <div class='container container--center'>
                    <h3 className='delete-confirmation'>Are you sure you want to let this timeslot go?</h3>
                    <Button
                        className="btn btn--delete"
                        onClick={deleteEvent}
                        text='Yes! Release the (timeslot) hounds!'
                    />
                    <Button
                        className="btn btn--linklike"
                        onClick={toggleModal}
                        text='Nope, I changed my mind.'
                    />
                </div>
            )}

            { ! confirmDelete && createQR && (
                <div class='container container--center'>
                    <EventQR qrvalue={selectedEvent.qrValue} />
                </div>
            )}
        </>
    );
};
export default SelectedEventDialog;
