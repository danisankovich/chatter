import React, {Component, PropTypes} from 'react';

class GroupForm extends Component {

  onSubmit(e) {
    e.preventDefault();
    const targetGroup = this.refs.group;
    const groupName = targetGroup.value;
    this.props.addGroup(groupName);
    targetGroup.value = '';
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
