import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import * as actions from '../actions';

class RemoveForm extends Component {
  handleFormSubmit(formProps) {
    this.props.removeEvent(formProps.event);
  }

  renderOptions() {
    return this.props.events.map(event => <option value={event._id} key={event._id}>{event.title}</option>);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <div className="form-group">
          <Field className="form-control" name="event" id="event" component="select">
            <option></option>
            {this.renderOptions()}
          </Field>
        </div>
        <button className="btn btn-primary btn-remove" type="submit">Remove event</button>
      </form>
    );
  }
}

const validate = formProps => {
  const errors ={};

  if (!formProps.event) {
    errors.event ='Please choose a start time';
  }

  return errors;
};

const mapStateToProps = state => (state);

export default reduxForm({
  form: 'removeEvent',
  validate
})
(connect(mapStateToProps, actions)(RemoveForm));