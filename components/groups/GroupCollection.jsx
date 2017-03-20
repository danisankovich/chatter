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
  const editGroup = (params, e) => {
    e.preventDefault();
    const token = localStorage.getItem('chatteruser');
    const [group, id, newName] = params;
    if (newName.trim().length === 0) {
      return;
    }
    console.log(group, id, newName)
    $.ajax({
       url: `/group/api/editgroup/${id}`,
       type: "PUT",
       headers: {
          "authorization": token,
          "creatorid": group.creatorId
       },
       data: {group: JSON.stringify(group), newName}
    })
    .done((response) => {
      response.newName = newName;
      // if the post was successful, add group to state and update users
      props.editGroup(response, props.activeGroup);
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
            editGroup={editGroup}
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
