import React from 'react';
import { Link } from "react-router";
import Logo from "../images/logo.png";

function Login() {
    return (
        <div className="auth">
            <img src={Logo} alt=""/>
            <div className="login-container">
                <h1>Log in</h1>
                <form>
                    <input required type="text" placeholder="Username"/>
                    <input required type="password" placeholder="Password"/>
                    <button type="submit">Login</button>
                    <span>Do not have an account? <Link to="/register">Sign up</Link></span>
                </form>
            </div>
        </div>
    );
}

export default Login;