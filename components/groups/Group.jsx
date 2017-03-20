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
  onChange(e) {
    this.setState({nameInput: e.target.value})
  }
  render() {
    const { group, activeGroup, deleteGroup, editGroup } = this.props;
    const active = group.name === activeGroup.name ? 'active sepline' : 'sepline';

    return (
      <li className={active}>
        <a onClick={this.makeActiveGroup.bind(this)}>
          {group.name}
        </a>
        <span> | </span><a onClick={deleteGroup.bind(this, group._id, group.creatorId)}>
          <span className="glyphicon glyphicon-remove"></span>
        </a>
        <span> | </span><a data-toggle="modal" href={`#${group._id}`}onClick={
          () => {
            console.log(group)
            this.state.editId = group._id;
          }
        }>
          <span className="glyphicon glyphicon-pencil"></span>
        </a>

    <div className="modal fade" id={group._id} role="dialog">
      <div className="modal-dialog">

        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal">&times;</button>
            <h4>Edit Group Name</h4>
          </div>
          <div className="modal-body">
            <form role="form" onSubmit={editGroup.bind(this, [group, group._id, this.state.nameInput])}>
              <div className="form-group">
                <input type="text" className="form-control" id="groupName" placeholder="Enter New Name" onChange={this.onChange.bind(this)}/>
              </div>
              <button type="submit" className="btn btn-success btn-block">Submit New Name</button>
            </form>
          </div>
        </div>

      </div>
    </div>
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
