import React, {Component, PropTypes} from 'react';

import User from './User.jsx';

const UserCollection = (props) => {
  const {users, currentUser} = props;
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

UserCollection.propTypes = {
  users: PropTypes.array.isRequired,
  currentUser: PropTypes.object.isRequired,
}

export default UserCollection;
