import React from 'react';
import SelectedEventDialog from './SelectedEventDialog';

const Modal = (props) => {

    if ( ! props.modalOpen ) {
        return null;
    }

    return(
        <div className='overlay'>
            <div className='modal'>
                <button className="modal__close" onClick={props.closeModal}>Close</button>
                <div className='modal__content'>
                    { props.modalContent === 'delete' && (
                        <SelectedEventDialog
                            selectedEvent={props.selectedEvent}
                            toggleModal={props.toggleModal}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
export default Modal;
