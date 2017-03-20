import React, {PropTypes, Component} from 'react';
import {sortBy} from 'lodash';

import Group from './Group.jsx';
const token = localStorage.getItem('chatteruser')

class GroupCollection extends Component {
  componentWillMount() {
    this.setState({editGroup: ''});
  }

  deleteGroup(id, creatorId) {
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
      this.props.deleteGroup(response, this.props.activeGroup);
    }).fail((error) => {
      alert(error.responseText)
    });
  }

  setEditGroup(group) {
    this.setState({editGroup: group});
    console.log(group)
  }

  onChange(e) {
    this.setState({nameInput: e.target.value})
  }

  editGroup(params, e) {
    e.preventDefault();
    const token = localStorage.getItem('chatteruser');
    const [group, newName] = params;
    if (newName.trim().length === 0) {
      return;
    }
    $.ajax({
       url: `/group/api/editgroup/${group._id}`,
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
      this.props.editGroup(response, this.props.activeGroup);
      $('#myModal').modal('toggle');
    }).fail((error) => {
      alert(error.responseText)
    });
  }
  // map over all groups and return the list
  render() {
    let { setGroup, groups } = this.props;

    groups = _.sortBy(groups, 'name');
    
    return (
      <div className='scroll-groups'>
        {groups && <ul>
          {groups.map(group =>
            <Group
              group={group}
              key={group._id}
              {...this.props}
              deleteGroup={this.deleteGroup.bind(this)}
              setEditGroup={this.setEditGroup.bind(this)}
            />
          )}
        </ul>}
        {!groups && <p>Loading...</p>}

        <div className="modal fade" id='myModal' role="dialog">
          <div className="modal-dialog">

            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h4>Edit Group Name</h4>
              </div>
              <div className="modal-body">
                <form role="form" onSubmit={this.editGroup.bind(this, [this.state.editGroup, this.state.nameInput])}>
                  <div className="form-group">
                    <input type="text" className="form-control" id="groupName" placeholder="Enter New Name" onChange={this.onChange.bind(this)}/>
                  </div>
                  <button type="submit" className="btn btn-success btn-block">Submit New Name</button>
                </form>
              </div>
            </div>

          </div>
        </div>
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
