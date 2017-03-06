import React, {Component, PropTypes} from 'react';

class User extends Component {

  render() {
    const { user, currentUser } = this.props;
    const isMe = () => user.username === currentUser.username ? '(me)' : '';

    return (
      <li>
        {`${user.username} ${isMe()}`}
      </li>
    )
  }
}

User.propTypes = {
  user: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
}

export default User;
