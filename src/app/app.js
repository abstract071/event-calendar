import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Route } from 'react-router-dom';

import EventCalendar from './components/event_calendar';
import Signup from './containers/signup';

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Signup}/>
        <Route path="/calendar" component={EventCalendar}/>
      </div>
    );
  }
}

export default hot(module)(App);