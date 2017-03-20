import React, { Component, PropTypes } from 'react';
import $ from 'jquery';

import { invalidPasswordCheck } from '../../../public/javascripts/utils';

class Signup extends Component {
  handleFormSubmit(e) {
    e.preventDefault();

    const { email, username, password, passwordConfirm } = this.state;

    if (invalidPasswordCheck(password, passwordConfirm).length > 0) {
      alert(invalidPasswordCheck(password, passwordConfirm));
      return;
    }

    // if email does not have an @, stop the signup.
    if (email.split('@').length !== 2) {
      alert('Invalid Email')
      return;
    }
    
    $.ajax({
      url: `/api/signup`,
      type: "POST",
      data: {email, password, username},
    }).done(response => {

      // set their token. If this exists and links to a user, they will automatically be logged in.
      localStorage.setItem('chatteruser', response.token);
      this.setUser(response.user);

    }).fail((error) => {
      alert(error.responseText)
    });
  }

  // send the new user data up
  setUser(user) {
    this.props.setUserName(user);
  }

  onInputChange(type, e) {
    this.setState({[type]: e.target.value});
  }
  render() {
    return (
      <div>
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
        <p>Passwords must contain:</p>
        <ul>
          <li>At least 3 characters</li>
          <li>At least 1 Uppercase letter</li>
          <li>At least 1 Lowercase letter</li>
          <li>At least 1 Number</li>
        </ul>
      </div>
    );
  }
}

Signup.propTypes = {
  setUserName: PropTypes.func.isRequired,
}

module.exports = Signup;
