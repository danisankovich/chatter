import React, {PropTypes} from 'react';

import GroupForm from './GroupForm.jsx';
import GroupCollection from './GroupCollection.jsx';

const GroupSection = (props) => {
  return (
    <div className="support panel panel-primary">
      <div className="panel-heading">
        <strong>Groups</strong>
      </div>

      <div className="panel-body groups">
        <GroupCollection {...props} />
        <GroupForm {...props} />
      </div>
    </div>

  )
}

GroupSection.propTypes = {
  groups: PropTypes.array.isRequired,
  setGroup: PropTypes.func.isRequired,
  addGroup: PropTypes.func.isRequired,
  deleteGroup: PropTypes.func.isRequired,
  activeGroup: PropTypes.object.isRequired,
}

export default GroupSection;
