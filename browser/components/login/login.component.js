import React, { PropTypes as T } from 'react';
import AuthService from '../../utils/AuthService';

class Login extends React.Component {
  constructor(props){
    super(props);
    this.login = this.login.bind(this);
  }

  login(){
    this.props.auth.login();
  }

  render() {
    const { auth } = this.props;
    return (
      <div className="login-center">
        <h2>login to start visualizing</h2>
        <a className="waves-effect waves-light btn" onClick={this.login}>login</a>
      </div>
    );
  }
}

//type checking
Login.propTypes = {
  location: T.object,
  auth: T.instanceOf(AuthService)
};

export default Login;
