import React, { useRef } from 'react'
import './register.css'
import { useHistory } from "react-router";
import axios from 'axios';
import Navbar from '../../components/Navbar';

export default function Register() {

    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const history = useHistory();

    const HandleClick = async (e) => {
        e.preventDefault();
        if (passwordAgain.current.value !== password.current.value) {
            passwordAgain.current.setCustomValidity("Passwords don't match!");
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            };
            try {
                // Send a POST request
                // await axios.post("/account/Register", user);
                axios({
                    method: 'post',
                    url: 'http://localhost:8000/account/Register',
                    data: user
                }).then(function (res) {
                    console.log(res);
                }).catch(function (err) {
                    console.log(err);
                });

            } catch (err) {
                console.log(err);
            }
        }
    }

    return (
        <>
            <Navbar />
            <div className='login'>
                <div className="loginWrapper">
                    <div className="loginLeft">
                        <h4 className="loginLogo">Login System</h4>
                        <p className="loginDesc">This is a sample project on Login System</p>
                    </div>
                    <div className="loginRight">
                        <form className="loginBox" onSubmit={HandleClick}>
                            <input placeholder='Username' className="loginInput" required ref={username} />
                            <input placeholder='Email' className="loginInput" required ref={email} type="email" />
                            <input placeholder='Password' className="loginInput" required ref={password} type="password" />
                            <input placeholder='Confirm Password' className="loginInput" required ref={passwordAgain} type="password" />
                            <button className="loginButton" type='submit'>Sign up</button>
                            <span className="loginForgot">Already Register?</span>
                            <a href='/login' className="loginregisterButton">Log into Account</a>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
