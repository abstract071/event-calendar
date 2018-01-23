import React, { Component } from 'react';

class CalendarSection extends Component {
  render() {
    return (
      <div className="time-section">
        <div className="time">{this.props.time}</div>
      </div>
    );
  }
}

export default CalendarSection;