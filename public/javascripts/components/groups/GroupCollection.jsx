import React, {Component, PropTypes} from 'react';
import $ from 'jquery';

import Group from './Group.jsx';

class GroupCollection extends Component {
  constructor(props) {
    super(props)
    this.state = { };
  }
  componentDidMount() {
    $.ajax({
       url: 'group/api/',
       type: "GET",
    }).done((groups) => {
      this.setState({ groups });
    }).fail((err) => {
      console.log('error', err)
    });
  }
  render() {
    let { setGroup } = this.props;
    const { groups } = this.state;
    return (<div>
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
