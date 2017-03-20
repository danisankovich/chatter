import React, {PropTypes} from 'react';
import $ from 'jquery';
import {sortBy} from 'lodash';

import Group from './Group.jsx';

const GroupCollection = (props) => {

  let { setGroup, groups } = props;
  groups = _.sortBy(groups, 'name');

  // map over all groups and return the list
  return (
    <div className='scroll-groups'>
      {groups && <ul>
        {groups.map(group =>
          <Group
            group={group}
            key={group._id}
            {...props}
          />
        )}
      </ul>}
      {!groups && <p>Loading...</p>}
    </div>
  )
}

GroupCollection.propTypes = {
  groups: PropTypes.array.isRequired,
  setGroup: PropTypes.func.isRequired,
  activeGroup: PropTypes.object.isRequired,
}

export default GroupCollection;
