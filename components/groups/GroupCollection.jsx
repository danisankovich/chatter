import React, {PropTypes} from 'react';
import $ from 'jquery';
import {sortBy} from 'lodash';

import Group from './Group.jsx';
const token = localStorage.getItem('chatteruser')

const GroupCollection = (props) => {
  const deleteGroup = (id, creatorId) => {
    const token = localStorage.getItem('chatteruser')
    $.ajax({
       url: `/group/api/deletegroup/${id}`,
       type: "DELETE",
       headers: {
          "authorization": token,
          "creatorid": creatorId
       },
    })
    .done((response) => {
      // if the post was successful, add group to state and update users
      props.deleteGroup(response, props.activeGroup);
    }).fail((error) => {
      alert(error.responseText)
    });
  }
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
            deleteGroup={deleteGroup}
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
