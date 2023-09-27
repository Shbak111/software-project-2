import React, { Component } from 'react';

class SignUp extends Component {
    render() {
        return (
            <div className="form-container sign-up-container">
                <form className="form" action="#">
                    <h1 className="form-title">회원 가입</h1>
                    
                    <input type="text" placeholder="닉네임" />
                    <input type="text" placeholder="이름" />
                    <input type="email" placeholder="이메일" />
                    <input type="password" placeholder="비밀번호" />
                    <button className="form-button">가입하기</button>
                </form>
            </div>
        );
    }
}

export default SignUp;