import React from 'react';
import { Link } from "react-router";

function Login() {
    return (
        <div className="auth-container">
            <h1>Log in</h1>
            <form>
                <input required type="text" placeholder="Username"/>
                <input required type="password" placeholder="Password"/>
                <button type="submit">Login</button>
                <span>Do not have an account? <Link to="/register">Sign up</Link></span>
            </form>
        </div>
    );
}

export default Login;