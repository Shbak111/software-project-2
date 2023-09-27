import React, { Component } from 'react';
import axios from "axios";
class SignUp extends Component {
    constructor(props){
        super(props);
        this.state = {
            nickname: "",
            name: "",
            email: "",
            password: "",
        };
    }

    handleInputChange = (e)=>{
        this.setState({[e.target.name]: e.target.value});
    }
    validateEmail = (email) => {
        // Regular expression for basic email validation
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return regex.test(email);
    }
    handleOnSubmit = async(e)=>{
        e.preventDefault();
        try{
            const{nickname,name,email,password}=this.state;
            if (!this.validateEmail(email)) {
                this.setState({
                    error: 'Please enter a valid email address.',
                });
                alert("이메일 형식에 맞게 작성해주세요.");
                return;
            }
            const result = await axios({
                url:"/register",
                method:"POST",
                data:{
                    nickname:nickname,
                    name:name,
                    email:email,
                    password:password,
                }
                    
                }
            );
            const data = result.data;
            console.log('data', data);

            if(data){
                alert("환영합니다");
                this.setState({
                    nickname:"",
                    name:"",
                    email:"",
                    password:"",
                });
            }
        }
        catch(e){
            console.error(e);
        }
    }

    render() {
        const{ nickname, name, email, password }=this.state;

        return (
            <div className="form-container sign-up-container">
                <form className="form" action="">
                    <h1 className="form-title">회원 가입</h1>
                    
                    <input type="text"  name="nickname" placeholder="닉네임" value={nickname} onChange={this.handleInputChange}/>
                    <input type="text" name="name" placeholder="이름" value={name} onChange={this.handleInputChange}/>
                    <input type="email" name="email" placeholder="이메일" value={email} onChange={this.handleInputChange}/>
                    <input type="password"name="password" placeholder="비밀번호" value={password} onChange={this.handleInputChange}/>
                    <button type="submit" className="form-button" onClick={this.handleOnSubmit}>가입하기</button>
                </form>
            </div>
        );
    }
}

export default SignUp;