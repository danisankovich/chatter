import React, {Component, PropTypes} from 'react';
import User from './User.jsx';
import { uniqBy, uniq } from 'lodash';

class UserCollection extends Component {

  render() {
    const {users} = this.props;
    return (
      <ul>
        {
          users.map(user =>
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
