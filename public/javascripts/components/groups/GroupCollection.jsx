import React, {Component, PropTypes} from 'react';
import $ from 'jquery';
import {sortBy} from 'lodash';

import Group from './Group.jsx';

class GroupCollection extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let { setGroup, groups } = this.props;
    groups = _.sortBy(groups, 'name');
    return (<div className='scroll-groups'>
      {groups && <ul>
        {groups.map(group =>
          <Group
            group={group}
            key={group._id}
            {...this.props}
          />
        )}
      </ul>}
      {!groups && <p>Loading...</p>}
      </div>
    )
  }
}

GroupCollection.propTypes = {
  groups: PropTypes.array.isRequired,
  setGroup: PropTypes.func.isRequired,
  activeGroup: PropTypes.object.isRequired,
}

export default GroupCollection;
