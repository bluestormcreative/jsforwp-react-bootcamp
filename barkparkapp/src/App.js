import React, {Component } from 'react';
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './App.css';

const localizer = momentLocalizer(moment);

class App extends Component {
    state = {
      events: [
        // {
        //   start: moment().toDate(),
        //   end: moment()
        //     .add(1, "days")
        //     .toDate(),
        //   title: "Some title"
        // }
      ]
  };
  render() {
    return (
      <div className="App">
        <div className="calendar__container">
          <h2 className="calendar__heading">Bark Park Calendar</h2>
          <Calendar
            localizer={localizer}
            defaultDate={new Date()}
            defaultView="week"
            events={this.state.events}
            style={{ height: "100vh" }}
            selectable={true}
            showMultiDayTimes={true}
            views={['week', 'day']}
            min={moment('06:00am', 'h:mma').toDate()}
            max={moment('09:00pm', 'h:mma').toDate()}
          />
        </div>
      </div>
    );
  }
}

export default App;
