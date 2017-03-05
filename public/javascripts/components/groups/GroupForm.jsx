import React, {Component, PropTypes} from 'react';
import $ from 'jquery';

class GroupForm extends Component {

  onSubmit(e) {
    e.preventDefault();
    const targetGroup = this.refs.group;
    const groupName = targetGroup.value;
    if (groupName.length > 15) {
      alert('Group Name Must Not Exceed 15 Characters.')
      return;
    }
    targetGroup.value = '';

    $.post('group/api/newgroup',
      { name: groupName }
    )
    .done((response) => {
      this.props.addGroup(response);
    }).fail((error) => {
      alert(error.responseText)
    });
  }
  render() {
    const { group } = this.props
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <div className="form-group">
          <input
            type="text"
            ref="group"
            name=""
            placeholder="Create A New Group"
          />
        </div>
      </form>
    )
  }
}

GroupForm.propTypes = {
  addGroup: PropTypes.func.isRequired,
}

export default GroupForm;
