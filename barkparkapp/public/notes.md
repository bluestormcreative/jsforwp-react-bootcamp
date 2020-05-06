[x] If timeslot selected is more than 30minutes, show an alert and do not save to state.
[x] If the user has already selected 3 timeslots this week, show an alert and do not save to state.
[x] If the timeslot selected is past, return.

-   If the timeslot selected is already selected by someone else, show an alert and do not save to state.

-   If the timeslot can be selected:
    -- Open a modal
    -- The modal shows:
    -- -- The start and end time selected
    -- -- A confirmation to reserve this slot
    -- -- A cancel button
    [x]-- -- Nice to have: the number of selections the user has already made for this week.

[x]- Save selected time to another object.
[x]-- Save data:
[x]--- Defaults: Start/end/title
[x]--- maybe make a unique ID for that slot to generate QR code

[x] - If the user clicks on their reserved timeslot, ask to confirm deleting that slot or keeping it?
-- Update this to modal:
-- Want to let this timeslot go? Yes, let some other pup use it! No, I want to use this time!

-   Calendar view should show
    [x]-- the users reserved slots (limit 3)
    -- all other reserved slots

[x] Nice to have: a list of upcoming reservedSlots that shows on the user dash
[x] sort this by date upcoming

[x] User login
[x] User logout

-   Update alerts to be dashmessages with timeouts
-   Save events to Firebase
-   Save userData to Firebase
-   Text user a link to a unique QR code 10 minutes before the time of their slots.

QUESTIONS FOR ZAC

1. SimpleStorage is totally not working - something about isAuthenticated check? somehow the dates are getting weird when i pass them into and out of state
2. How can I stop having to log in everytime?
3. Can I move the other stuff out of the render call?
4. How best to think about refactoring? (other than firebase stuff from book)
5. I can't figure out how to get user data from Firebase, always returns undefined but i can console log the user data after auth()
6. I want to send the user a QR code for each event timeslot, but i'm not sure if I should just send a link to a 3rd party or maybe generate the code when the event is created and then display it on the dashboard at the time of the event?
