import React, {Component, PropTypes} from 'react';

import Signup from './auth/Signup.jsx';
import Signin from './auth/Signin.jsx';

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = { form: 'signup' };
  }
  toSignInPage() {
    this.setState({ form: 'signin' });
  }
  toSignUpPage() {
    this.setState({ form: 'signup' });
  }

  render() {
    return (
      <div>
        { this.state.form !== 'signin' &&
          <div>
            <Signup setUserName={this.props.setUserName.bind(this)} />
            <p>Already Registered? <a onClick={this.toSignInPage.bind(this)}>Sign In</a></p>
          </div>
        }
        { this.state.form === 'signin' &&
          <div>
            <Signin setUserName={this.props.setUserName.bind(this)} />
            <p>Not Registered? <a onClick={this.toSignUpPage.bind(this)}>Sign Up</a></p>
          </div>
        }
      </div>
    )
  }
}

UserForm.propTypes = {
  setUserName: PropTypes.func.isRequired,
}

export default UserForm;
