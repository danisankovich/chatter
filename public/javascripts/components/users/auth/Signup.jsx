import React, { Component } from 'react';
import $ from 'jquery';

class Signup extends Component {
  handleFormSubmit(e) { //called with props from submit form
    e.preventDefault();
    const { email, username, password, passwordConfirm } = this.state;
    if (password !== passwordConfirm) {
      this.renderAlert();
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

  renderAlert() {
    alert('Passwords do not match')
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
          <input className="form-control" onChange={this.onInputChange.bind(this, 'email')} />
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
