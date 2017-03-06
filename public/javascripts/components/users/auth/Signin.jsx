import React, { Component, PropTypes } from 'react';
import $ from 'jquery';

class Signin extends Component {
  handleFormSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;

    $.post(`/api/signin`, { email, password })
      .done(response => {
        localStorage.setItem('chatteruser', response.token);
        this.setUser(response.user);
      })
      .fail((err) => {
        console.log(err)
        // catch does not take you to new page
        alert('password/username combination not found');
      })
  }

  //send the logged in user data up
  setUser(user) {
    this.props.setUserName(user);
  }

  onInputChange(type, e) {
    this.setState({[type]: e.target.value});
  }
  render() {
    return (
      <form onSubmit={this.handleFormSubmit.bind(this)}>
        <fieldset className="form-group">
          <label>Email: </label>
          <input className="form-control" onChange={this.onInputChange.bind(this, 'email')} />
        </fieldset>
        <fieldset className="form-group">
          <label>Password: </label>
          <input className="form-control" type="password" onChange={this.onInputChange.bind(this, 'password')} />
        </fieldset>
        <button action="submit" className="btn btn-primary">Sign In</button>
      </form>
    );
  }
}

Signin.propTypes = {
  setUserName: PropTypes.func.isRequired,
}

module.exports = Signin;
