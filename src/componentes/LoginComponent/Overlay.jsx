import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Overlay extends Component {
  render() {
    const { handleClickSignInButton, handleClickSignUpButton } = this.props;
    return (
      <div className='overlay-container'>
        <div className='overlay'>
          <div className='overlay-panel overlay-left'>
            <h1>환영합니다!</h1>
            <p className='overlay-description'>
              이미 가입한 회원이시라면,<br />
              로그인 후 더 많은 서비스를 이용할 수 있습니다.
            </p>
            <button
              className='ghost form-button'
              id='signIn'
              onClick={handleClickSignInButton}
            >
              로그인
            </button>
          </div>
          <div className='overlay-panel overlay-right'>
            <h1>Hello!</h1>
            <p className='overlay-description'>
              아직 회원이 아니시라면,<br />
              가입 후 더 많은 서비스를 이용할 수 있습니다.
            </p>
            <button
              className='ghost form-button'
              id='signUp'
              onClick={handleClickSignUpButton}
            >
              회원 가입
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Overlay.propTypes = {
  handleClickSignInButton: PropTypes.func.isRequired,
  handleClickSignUpButton: PropTypes.func.isRequired,
};

export default Overlay;
