- If timeslot selected is more than 30minutes, show an alert and do not save to state.
- If the user has already selected 3 timeslots this week, show an alert and do not save to state.
- If the timeslot selected is already selected by someone else, show an alert and do not save to state.

- If the timeslot can be selected:
-- Open a modal
-- The modal shows:
-- -- The start and end time selected
-- -- A confirmation to reserve this slot
-- -- A cancel button
-- -- Nice to have: the number of selections the user has already made for this week.

- Save selected time to another object.
-- Save data:
--- User logged in ID
--- maybe make a unique ID for that slot? to compare against other slots?

- If the user clicks on their reserved timeslot, ask to confirm deleting that slot or keeping it?
-- Want to let this timeslot go? Yes, let some other pup use it! No, I want to use this time!

- Calendar view should show
-- the users reserved slots (limit 3)
-- all other reserved slots