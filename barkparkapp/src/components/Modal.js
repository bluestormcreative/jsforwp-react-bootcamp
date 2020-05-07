import React from 'react';
import SelectedEventDialog from './SelectedEventDialog';
import Button from './Button';

const Modal = (props) => {

    if ( ! props.modalOpen ) {
        return null;
    }

    return(
        <div className='overlay'>
            <div className='modal'>
                <Button
                    className="btn btn--small modal__close"
                    onClick={props.toggleModal}
                    text='Close'
                />
                <div className='modal__content'>
                    { props.modalContent === 'delete' && (
                        <SelectedEventDialog
                            selectedEvent={props.selectedEvent}
                            toggleModal={props.toggleModal}
                            formatTime={props.formatTime}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
export default Modal;
