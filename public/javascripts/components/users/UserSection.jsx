import React, {Component, PropTypes} from 'react';

import UserCollection from './UserCollection.jsx';

class UserSection extends Component {

  render() {
    return (
      <div className="support panel panel-primary">
        <div className="panel-heading">
          <div>
            <strong>Users</strong>
          </div>
        </div>

        <div className="panel-body users">
          <UserCollection {...this.props} />
        </div>
      </div>

    )
  }
}

UserSection.propTypes = {
  users: PropTypes.array.isRequired,
}

export default UserSection;
