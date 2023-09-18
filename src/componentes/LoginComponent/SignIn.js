import React, { Component } from 'react';

class SignIn extends Component {
    render() {
        return (
            <div className="form-container sign-in-container">
                <form className="form" action="#">
                    <h1 className="form-title">환영합니다!</h1>

                    <input  type="email" placeholder='email'/>
                    <input  type="password" placeholder='password'/>
                      
                    <button className="form-button">로그인</button>
                    <a className="find-password" href="#">비밀번호 찾기</a>
                </form>
            </div>
        );
    }
}

export default SignIn;