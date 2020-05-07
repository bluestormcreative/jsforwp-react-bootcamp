import React from 'react';

const UserSlotsList = (props) => {

    const {
        currentSlots,
        remainingSlots
    } = props;

    return(
        <div className='userslots'>
            <p className='userslots__remaining'>Timeslots available: {remainingSlots}</p>
            <p className='userslots__reserved'>Your reserved timeslots:</p>
            <ol className='userslots__list'>{currentSlots}</ol>
        </div>
    );
}
export default UserSlotsList;
