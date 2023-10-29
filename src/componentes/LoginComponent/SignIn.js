import React, { useState, useReducer } from 'react';
import axios from 'axios';
import { setNickname } from './user';
import { useHistory } from 'react-router-dom';
import { login } from './auth';

const initialState = {
    authenticated: false,
    token: null
}
function reducer(state, action) {
    switch (action.type) {
      case 'SET_TOKEN':
        return { ...state, token: action.token, authenticated: action.result };
      case 'DELETE_TOKEN':
        return { ...state, token: null, authenticated: false };
      default:
        return state;
    }
  }

function SignIn() {
    const history = useHistory();
    const [state, setState] = useState({
        email: '',
        password: '',
    });

    const [restate, dispatch] = useReducer(reducer, initialState);
    const { authenticated } = restate;


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
                let token = login();
                dispatch({
                    type: 'SET_TOKEN',
                    token: token,
                    result: true,
                  });
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
                dispatch({
                    type: 'SET_TOKEN',
                    token: null,
                    result: false,
                  });
                alert('로그인 실패');
            }
        } catch (error) {
            dispatch({
                type: 'SET_TOKEN',
                token: null,
                result: false,
              });
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
