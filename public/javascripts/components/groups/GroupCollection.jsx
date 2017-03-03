import React, {Component, PropTypes} from 'react';

import Group from './Group.jsx';

class GroupCollection extends Component {

  render() {
    let { groups, setGroup } = this.props;
    return (
      <ul>
        {groups.map(group =>
          <Group
            group={group}
            key={group.id}
            {...this.props}
          />
        )}
      </ul>
    )
  }
}

GroupCollection.propTypes = {
  groups: PropTypes.array.isRequired,
  setGroup: PropTypes.func.isRequired,
  activeGroup: PropTypes.object.isRequired,
}

export default GroupCollection;
