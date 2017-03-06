import React, {Component, PropTypes} from 'react';

import User from './User.jsx';

class UserCollection extends Component {

  render() {
    const {users, currentUser} = this.props;
    return (
      <ul>
        {
          users.map(user =>
            <User currentUser={currentUser}
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
  currentUser: PropTypes.object.isRequired,
}

export default UserCollection;
