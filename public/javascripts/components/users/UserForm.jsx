import React, {Component, PropTypes} from 'react';
import Signup from './auth/Signup.jsx';
import Signin from './auth/Signin.jsx';

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = { form: 'signup' };
  }
  toSignIn() {
    this.setState({ form: 'signin' });
  }
  toSignUp() {
    this.setState({ form: 'signup' });
  }

  render() {
    return (
      <div>
        { this.state.form !== 'signin' &&
          <div>
            <Signup setUserName={this.props.setUserName.bind(this)} />
            <p>Already Registered? <a onClick={this.toSignIn.bind(this)}>Sign In</a></p>
          </div>
        }
        { this.state.form === 'signin' &&
          <div>
            <Signin setUserName={this.props.setUserName.bind(this)} />
            <p>Not Registered? <a onClick={this.toSignUp.bind(this)}>Sign Up</a></p>
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
