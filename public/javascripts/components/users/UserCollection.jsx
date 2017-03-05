import React, {Component, PropTypes} from 'react';

import User from './User.jsx';

class UserCollection extends Component {

  render() {
    const {users} = this.props;
    return (
      <ul>
        {
          users.map(user =>
            <User currentUser={this.props.currentUser}
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
