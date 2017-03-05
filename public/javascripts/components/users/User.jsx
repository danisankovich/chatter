import React, {Component, PropTypes} from 'react';

class User extends Component {

  render() {
    console.log(this.props.user)
    return <li>{this.props.user.username}</li>
  }
}

User.propTypes = {
  user: PropTypes.object.isRequired,
}

export default User;
