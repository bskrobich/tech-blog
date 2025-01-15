import React, {useContext, useState} from 'react';
import {Link, useNavigate} from "react-router";
import Logo from "../images/logo.png";
import {AuthContext } from "../context/authContext.jsx";

function Login() {
    const [input, setInput] = useState({
        username: "",
        password: "",
    });

    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const { login } = useContext(AuthContext);

    const handleChange = (e) => {
        setInput(previous => ({ ...previous, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(input);
            navigate("/");
        } catch (error) {
            setError(error.response.data);
        }
    }

    return (
        <div className="auth">
            <Link to="/">
                <img src={Logo} alt="Logo"/>
            </Link>
            <div className="auth-container">
                <h1>Log in</h1>
                <form>
                    <input required type="text" placeholder="Username" onChange={handleChange} name="username" />
                    <input required type="password" placeholder="Password" onChange={handleChange} name="password" />
                    <button type="submit" onClick={handleSubmit}>Login</button>
                    {error && <p><b>{error}</b></p>}
                    <span>Do not have an account? <Link to="/register">Sign up</Link></span>
                </form>
            </div>
        </div>
    );
}

export default Login;