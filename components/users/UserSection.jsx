import React, {PropTypes} from 'react';

import UserCollection from './UserCollection.jsx';

const UserSection = (props) => {
  return (
    <div className="support panel panel-primary">
      <div className="panel-heading">
        <div>
          <strong>Users</strong>
        </div>
      </div>

      <div className="panel-body users">
        <UserCollection {...props} />
      </div>
    </div>

  )
}

UserSection.propTypes = {
  users: PropTypes.array.isRequired,
  currentUser: PropTypes.object.isRequired,
}

export default UserSection;
