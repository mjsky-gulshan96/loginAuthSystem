import React, { useRef, useContext } from 'react'
import './login.css'
import { useHistory } from "react-router";
import axios from 'axios';
import Navbar from '../../components/Navbar';

export default function Login() {

    const history = useHistory();
    const email = useRef()
    const password = useRef()

    const HandleClick = (e) => {
        e.preventDefault();
        const user = {
            email: email.current.value,
            password: password.current.value
        }
        axios({
            method: 'post',
            url: 'http://localhost:8000/account/Login',
            data: user
        }).then(function (res) {
            let data = res.data;
            if (data.success) {
                sessionStorage.setItem('user',JSON.stringify(data.user))
                history.push('/profile');
               window.location.reload()
            }
        }).catch(function (err) {
            console.log(err.response);
            alert(err.response.statusText)
        });
    }

    return (
        <>
        <Navbar/>
        <div className='login'>
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Login System</h3>
                    <span className="loginDesc">This is a sample project on Login System</span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={HandleClick}>
                        <input placeholder='Email' type="email" className="loginInput" required ref={email} />
                        <input placeholder='Password' type="password" minLength="6" className="loginInput" required ref={password} />
                        <button className="loginButton" type='submit'>Log In</button>
                        <span className="loginForgot">Forgot Password?</span>
                        <a href='/register' className="loginregisterButton">Create New Account</a>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}
