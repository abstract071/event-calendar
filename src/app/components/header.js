import React, { Component } from 'react';

import AddForm from '../containers/add_form';
import RemoveForm from '../containers/remove_form';

class Header extends Component {
    render() {
        return (
          <header>
            <h4 className="title">Simple Event Calendar</h4>
            <AddForm />
            <RemoveForm events={this.props.events} />
            <a
              className="btn btn-primary btn-export"
              href="/assets/events.json"
              download
            >Export JSON</a>
          </header>
        );
    }
}

export default Header;