import React, { Component } from 'react';

class CalendarEvent extends Component {
  render() {
    const { title, width, height, top, left } = this.props;

    const style = {
      width,
      height,
      top,
      left
    };

    return (
      <div className="event" style={style}>
        <span>{title}</span>
      </div>
    );
  }
}

export default CalendarEvent;