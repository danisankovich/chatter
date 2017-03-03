import React, {Component, PropTypes} from 'react';

class UserForm extends Component {

  onSubmit(e) {
    e.preventDefault();
    const targetNode = this.refs.userName;
    const userName = targetNode.value;
    this.props.setUserName(userName);
    targetNode.value = '';
  }
  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <div className="form-group">
          <input
            type="text"
            ref="userName"
            className='form-control'
            placeholder="what is your name..."
          />
        </div>
      </form>
    )
  }
}

UserForm.propTypes = {
  setUserName: PropTypes.func.isRequired,
}

export default UserForm;
