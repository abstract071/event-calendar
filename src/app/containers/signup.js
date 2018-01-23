import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import * as actions from '../actions';

const renderField = ({ input, type, meta: { touched, error }, labelText }) => (
  <fieldset className="form-group">
    <label>{labelText}</label>
    <input {...input} type={type} className="form-control" />
    {touched && error && <div className="error">{error}</div>}
  </fieldset>
);

class Signup extends Component {
  handleFormSubmit(formProps) {
    this.props.signinUser(formProps);
  }

  // renderAlert() {
  //   if (this.props.errorMessage) {
  //     return (
  //       <div className="alert alert-danger">
  //         {this.props.errorMessage}
  //       </div>
  //     );
  //   }
  // }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field name="email" component={renderField} type="email" labelText="Email:" />
        <Field name="password" component={renderField} type="password" labelText="Password:" />
        <Field name="confirmPassword" component={renderField} type="password" labelText="Confirm Password:" />
        {/*{this.renderAlert()}*/}
        <button type="submit" className="btn btn-primary">Sign up</button>
      </form>
    );
  }
}

const validate = formProps => {
  const errors ={};

  if (!formProps.email) {
    errors.email ='Please enter an email';
  }

  if (!formProps.password) {
    errors.password ='Please enter a password';
  }

  if (!formProps.confirmPassword) {
    errors.confirmPassword ='Please confirm a password';
  }

  if (formProps.password !== formProps.confirmPassword) {
    errors.password ='Passwords must match';
  }

  return errors;
};

const mapStateToProps = state => (state);

export default reduxForm({
  form: 'signup',
  validate
})
(connect(mapStateToProps, actions)(Signup));
