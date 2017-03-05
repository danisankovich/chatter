import React, {Component, PropTypes} from 'react';
import Signup from './auth/Signup.jsx';

class UserForm extends Component {

  render() {
    return (
      <div>
        <Signup setUserName={this.props.setUserName.bind(this)} />
      </div>
    )
  }
}

UserForm.propTypes = {
  setUserName: PropTypes.func.isRequired,
}

export default UserForm;
