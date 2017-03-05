import React, {Component, PropTypes} from 'react';

import GroupForm from './GroupForm.jsx';
import GroupCollection from './GroupCollection.jsx';

class GroupSection extends Component {
  render() {
    return (
      <div className="support panel panel-primary">
        <div className="panel-heading">
          <strong>Groups</strong>
        </div>

        <div className="panel-body groups">
          <GroupCollection {...this.props} />
          <GroupForm {...this.props} />
        </div>
      </div>

    )
  }
}

GroupSection.propTypes = {
  groups: PropTypes.array.isRequired,
  setGroup: PropTypes.func.isRequired,
  addGroup: PropTypes.func.isRequired,
  activeGroup: PropTypes.object.isRequired,
}

export default GroupSection;
