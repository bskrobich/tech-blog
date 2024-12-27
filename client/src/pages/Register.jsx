import React from 'react';
import { Link } from "react-router";

function Register() {
    return (
        <div className="auth-container">
            <h1>Sign up</h1>
            <form>
                <input required type="email" placeholder="E-mail"/>
                <input required type="text" placeholder="Username"/>
                <input required type="password" placeholder="Password"/>
                <button type="submit">Sign up</button>
                <span>Already have an account? <Link to="/login">Log in</Link></span>
            </form>
        </div>
    );
}

export default Register;