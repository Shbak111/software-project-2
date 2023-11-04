import React, { useState, useReducer } from 'react';
import axios from 'axios';
import { setNickname } from './user';
import { useHistory } from 'react-router-dom';

function SignIn() {
    const history = useHistory();
    const [state, setState] = useState({
        email: '',
        password: '',
    });


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({
            ...state,
            [name]: value,
        });
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = state;
        try {
            const response = await axios.post('/login', {
                email,
                password,
            });
            if (response.data.authenticated) {
                const nickname = response.data.nickname;
                setNickname(nickname);
                alert(nickname + "님! 환영합니다!");
                history.push({
                    pathname: '/Mypage',
                });
                setState({
                    email: '',
                    password: '',
                });
            } else {
                alert('로그인 실패');
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('로그인 실패');
        }
    };

    return (
        <div className="form-container sign-in-container">
            <form className="form">
                <h1 className="form-title">환영합니다!</h1>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={state.email}
                    onChange={handleInputChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={state.password}
                    onChange={handleInputChange}
                />

                <button className="form-button" onClick={handleOnSubmit}>
                    로그인
                </button>
                <a className="find-password" href="#">
                    비밀번호 찾기
                </a>
            </form>
        </div>
    );
}

export default SignIn;
