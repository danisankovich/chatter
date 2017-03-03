import React, {Component, PropTypes} from 'react';
import User from './User.jsx';

class UserCollection extends Component {

  render() {
    return (
      <ul>
        {
          this.props.users.map(user =>
            <User
              key={user.id}
              user={user}
            />
          )
        }
      </ul>

    )
  }
}

UserCollection.propTypes = {
  users: PropTypes.array.isRequired,
}

export default UserCollection;
