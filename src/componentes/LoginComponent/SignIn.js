import React, { Component } from 'react';
import axios from 'axios';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        });
    };

    handleOnSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = this.state;

        try {
            const response = await axios.post('/login', {
                email,
                password,
            });

            if (response.data.authenticated) {
                alert('환영합니다');
                this.setState({
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

    render() {
        return (
            <div className="form-container sign-in-container">
                <form className="form">
                    <h1 className="form-title">환영합니다!</h1>

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={this.state.email}
                        onChange={this.handleInputChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handleInputChange}
                    />

                    <button className="form-button" onClick={this.handleOnSubmit}>
                        로그인
                    </button>
                    <a className="find-password" href="#">
                        비밀번호 찾기
                    </a>
                </form>
            </div>
        );
    }
}

export default SignIn;
