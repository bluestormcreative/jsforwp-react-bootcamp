import React from 'react';
import DeleteDialog from './DeleteDialog';

const Modal = (props) => {

    // Render nothing if the "show" prop is false
    if ( ! props.modalOpen ) {
        return null;
    }

    return(
        <div className='overlay'>
            <div className='modal'>
                <button className="modal__close" onClick={props.closeModal}>Close</button>
                <div className='modal__content'>
                    <DeleteDialog
                        selectedEvent={props.selectedEvent}
                        toggleModal={props.toggleModal}
                    />
                </div>
            </div>
        </div>
    );
}
export default Modal;
