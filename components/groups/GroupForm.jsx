import React, {Component, PropTypes} from 'react';
const token = localStorage.getItem('chatteruser')

class GroupForm extends Component {

  onFormSubmit(e) {
    e.preventDefault();

    const targetGroup = this.refs.group;
    const groupName = targetGroup.value;
    const targetSticky = this.refs.sticky || {};
    let stickyValue = targetSticky.value;

    if (groupName.trim().length > 15) {
      alert('Group Name Must Not Exceed 15 Characters.')
      return;
    }
    if (groupName.trim().length < 3) {
      alert('Group Name Must Be At Least 3 Characters Long.')
      return;
    }

    if (!this.props.currentUser.isAdmin) {
      stickyValue = false;
    }
    const token = localStorage.getItem('chatteruser')

    targetGroup.value = '';
    $.ajax({
       url: 'group/api/newgroup',
       type: "POST",
       headers: {
          "authorization": token
       },
       data: { name: groupName, stickied: stickyValue || false },
    })
    .done((response) => {
      // if the post was successful, add group to state and update users
      this.props.addGroup(response);
    }).fail((error) => {
      alert(error.responseText)
    });
  }
  render() {
    const { group } = this.props
    return (
      <form onSubmit={this.onFormSubmit.bind(this)} className='group-form'>
        <div className="form-group">
          <input
            type="text"
            ref="group"
            name=""
            placeholder="Create A New Group"
          />
        </div>
        {this.props.currentUser.isAdmin && <div className="form-group">
          <label>Stickied? <input
            type="checkbox"
            ref="sticky"
            name="sticky"
            value="true"
          /></label>
        </div>}
      </form>
    )
  }
}

GroupForm.propTypes = {
  addGroup: PropTypes.func.isRequired,
}

export default GroupForm;
