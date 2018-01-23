import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import Header from '../components/header';
import CalendarSection from './calendar_section';
import CalendarEvent from './calendar_event';
import * as actions from '../actions';

import { hours } from '../constants/hours_stub';

class EventCalendar extends Component {
  componentWillMount() {
    this.props.fetchEvents();
  }

  getSections() {
    return hours ?
      hours.map(time => <CalendarSection time={time} key={Date.now() + time} />) : [];
  }

  getEvents() {
    return this.calculateIntersections().map(data => {
      return <CalendarEvent
        key={data._id}
        title={data.title}
        width={`${(270 - 70) / data.cevc}px`}
        height={`${data.duration * 2}px`}
        top={`${data.start * 2}px`}
        left={`${((270 - 70) / data.cevc) * data.hindex}px`}
      />
    });
  }

  calculateIntersections() {
    const eventsData = _.cloneDeep(this.props.events);
    const minutesAmount = 540;
    let timeslots = [];
    let event = null;

    for (let i = 0; i < minutesAmount; i++) {
      timeslots[i] = [];
    }

    for (let i = 0; i < eventsData.length; i++) {
      event = eventsData[i];

      for (let j = event.start; j < event.start + event.duration; j++) {
        timeslots[j].push(event._id);
      }
    }

    for (let i = 0; i < minutesAmount; i++) {
      let next_hindex = 0;
      let timeslotLength = timeslots[i].length;

      if (timeslotLength > 0) {
        for (let j = 0; j < timeslotLength; j++) {
          event = _.find(eventsData, { _id: timeslots[i][j] });

          if (event.cevc < timeslotLength) {
            event.cevc = timeslotLength;

            if (event.hindex === 0) {
              event.hindex = next_hindex;
              next_hindex++;
            }
          }
        }
      }
    }

    return eventsData;
  }

  render() {
    return (
      <div>
        <Header events={this.props.events} />
        <div className="calendar">
          {this.getSections()}
          <div className="events-holder">
            {this.getEvents()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ events }) => ({ events });

export default connect(mapStateToProps, actions)(EventCalendar);