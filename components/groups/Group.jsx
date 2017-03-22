import React, {PropTypes, Component} from 'react';

class Group extends Component {
  componentWillMount() {
    this.setState({nameInput: ''});
  }


  makeActiveGroup(e) {
    e.preventDefault();
    const { setGroup, group } = this.props;
    setGroup(group);
  }


  render() {
    const { group, activeGroup, deleteGroup, editGroup, setEditGroup } = this.props;
    const active = group.name === activeGroup.name ? 'active sepline' : 'sepline';
    const groupToEdit = this.state.editGroup;

    return (
      <li className={active}>
        <a onClick={this.makeActiveGroup.bind(this)}>
          {group.name}
        </a>
        {(this.props.currentUser.isAdmin || this.props.currentUser.id == group.creatorId)
          && <div style={{display: "inline"}}><span> | </span>
            <a onClick={deleteGroup.bind(this, group._id, group.creatorId)}>
              <span className="glyphicon glyphicon-remove"></span>
            </a>
          </div>
        }
        {(this.props.currentUser.isAdmin || this.props.currentUser.id == group.creatorId)
          && <div style={{display: "inline"}}><span> | </span>
            <a data-toggle="modal" href='#myModal' onClick={setEditGroup.bind(this, group)}>
              <span className="glyphicon glyphicon-pencil"></span>
            </a>
          </div>
        }
      </li>
    )
  }
}

Group.propTypes = {
  group: PropTypes.object.isRequired,
  setGroup: PropTypes.func.isRequired,
  deleteGroup: PropTypes.func.isRequired,
  editGroup: PropTypes.func.isRequired,
  activeGroup: PropTypes.object.isRequired
}

export default Group;
