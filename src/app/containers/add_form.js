import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import * as actions from '../actions';

const renderField = ({ input, type, meta: { touched, error }, labelText, ...props }) => {
  return <div className="form-group row">
    <label className="col-sm-5 col-form-label">{labelText}</label>
    <div className="col-sm-7">
      <input {...input} {...props} type={type} className="form-control" />
      {touched && error && <div className="error">{error}</div>}
    </div>
  </div>
};

class AddForm extends Component {
  handleFormSubmit(formProps) {
    this.props.addEvent(formProps);
    this.props.reset();
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field name="start" id="start" component={renderField} type="time" labelText="Start" min="08:00" max="17:00" step="300" />
        <Field name="duration" id="duration" component={renderField} type="number" labelText="Duration (min)" min="10" max="180" step="5" />
        <Field name="title" id="title" component={renderField} type="text" labelText="Title" placeholder="Title" />
        <button className="btn btn-primary btn-add" type="submit">Add event</button>
      </form>
    );
  }
}

const validate = formProps => {
  const errors ={};

  if (!formProps.start) {
    errors.start ='Please choose a start time';
  }

  if (!formProps.duration) {
    errors.duration ='Please choose a duration';
  }

  if (!formProps.title) {
    errors.title ='Please enter a title';
  }

  return errors;
};

const mapStateToProps = state => (state);

export default reduxForm({
  form: 'addEvent',
  validate
})
(connect(mapStateToProps, actions)(AddForm));