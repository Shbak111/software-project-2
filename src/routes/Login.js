import React, { Component } from 'react';
import SignIn from '../componentes/LoginComponent/SignIn';
import SignUp from '../componentes/LoginComponent/SignUp';
import Overlay from '../componentes/LoginComponent/Overlay';
import '../css/Login.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      rightPanelActive: false,
    };
  }

  handleClickSignUpButton = () => this.setState({
    rightPanelActive: true,
  });

  handleClickSignInButton = () => this.setState({
    rightPanelActive: false,
  });

  render() {
    const { handleClickSignUpButton, handleClickSignInButton } = this;
    const { rightPanelActive } = this.state;
    return (
      <div className="Login">
        <div
          className={`container ${rightPanelActive ? 'right-panel-active' : ''}`}
          id="container"
        >
          <SignUp />
          <SignIn />
          <Overlay
            handleClickSignInButton={handleClickSignInButton}
            handleClickSignUpButton={handleClickSignUpButton}
          />
        </div>
      </div>
    );
  }
}

export default Login;
