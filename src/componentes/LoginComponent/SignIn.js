import React, { useState } from 'react';
import axios from 'axios';
function SignIn() {
  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const [nickname, setNickname] = useState(''); 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };
  
  const fetchUserNickname = async (token) => {
    try {
      const successResponse = await axios.get("/login/success", {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setNickname(successResponse.data.nickname);
      
      // Move the alert inside this block
      alert(`${successResponse.data.nickname}님! 환영합니다!`);
      
      console.log(`Welcome, ${successResponse.data.nickname}!`);
      
      // You can also add the redirection here if needed
      window.location.href = "/Mypage";
    } catch (error) {
      console.error("Error fetching user nickname:", error);
    }
  };
  
  // ...
  
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = state;
  
    try {
      const response = await axios.post('/login', {
        email,
        password,
      });
      if (response.data.authenticated) {
        const token = response.data.accessToken;
        localStorage.setItem("token", token);
        fetchUserNickname(token);
        
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
