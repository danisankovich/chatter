import React, { Component } from 'react';
import $ from 'jquery';

class Signup extends Component {
  handleFormSubmit(e) { //called with props from submit form
    e.preventDefault();
    const { email, username, password, passwordConfirm } = this.state;
    if (password.length < 3) {
      this.renderAlert('PASSWORD_LENGTH');
      return;
    }
    if (!password.match(/[a-z]/g)) {
      this.renderAlert('NO_LOWER_CASE');
      return;
    };
    if (!password.match(/[A-Z]/g)) {
      this.renderAlert('NO_UPPER_CASE');
      return;
    }
    if (!password.match(/[0-9]/g)) {
      this.renderAlert('NO_NUMBERS');
      return;
    }

    if (password !== passwordConfirm) {
      this.renderAlert('PASSWORDS_DONT_MATCH');
      return;
    }
    if (email.split('@').length !== 2) {
      this.renderAlert('INVALID_EMAIL')
      return;
    }
    $.ajax({
      url: `/api/signup`,
      type: "POST",
      data: {email, password, username},
    }).done(response => {
      localStorage.setItem('chatteruser', response.token);
      this.setUser(response.user);

    }).fail((error) => {
      console.log(error.responseText)
    });
  }
  setUser(user) {
    this.props.setUserName(user);
  }

  renderAlert(errorType) {
    if (errorType === 'NO_LOWER_CASE') alert('Password must contain at least 1 lower case letter');
    if (errorType === 'NO_UPPER_CASE') alert('Password must contain at least 1 upper case letter');
    if (errorType === 'NO_NUMBERS') alert('Password must contain at least 1 number');
    if (errorType === 'PASSWORD_LENGTH') alert('Passwords must be at least 3 characters');
    if (errorType === 'PASSWORDS_DONT_MATCH') alert('Passwords do not match');
    if (errorType === 'INVALID_EMAIL') alert('Invalid Email');
  }
  onInputChange(type, e) {
    this.setState({[type]: e.target.value});
  }
  render() {
    // const { handleSubmit, fields: {email, username, password, passwordConfirm }} = this.props;
    return (
      <form onSubmit={this.handleFormSubmit.bind(this)}>
        <fieldset className="form-group">
          <label>Email: </label>
          <input type='email' className="form-control" onChange={this.onInputChange.bind(this, 'email')} />
        </fieldset>
        <fieldset className="form-group">
          <label>Username: </label>
          <input className="form-control" maxLength="12" onChange={this.onInputChange.bind(this, 'username')} />
        </fieldset>
        <fieldset className="form-group">
          <label>Password: </label>
          <input className="form-control" type="password" onChange={this.onInputChange.bind(this, 'password')} />
        </fieldset>
        <fieldset className="form-group">
          <label>Confirm Password: </label>
          <input className="form-control" type="password" onChange={this.onInputChange.bind(this, 'passwordConfirm')} />
        </fieldset>
        <button action="submit" className="btn btn-primary">Sign Up</button>
      </form>
    );
  }
}

module.exports = Signup;
