import React, {Component, PropTypes} from 'react';

class Group extends Component {
  makeActiveGroup(e) {
    e.preventDefault();
    const { setGroup, group } = this.props;
    setGroup(group);
  }
  render() {
    const { group, activeGroup } = this.props
    const active = group.name === activeGroup.name ? 'active' : '';

    return (
      <li className={active}>
        <a onClick={this.makeActiveGroup.bind(this)}>
          {group.name}
        </a>
      </li>
    )
  }
}

Group.propTypes = {
  group: PropTypes.object.isRequired,
  setGroup: PropTypes.func.isRequired,
  activeGroup: PropTypes.object.isRequired
}

export default Group;
