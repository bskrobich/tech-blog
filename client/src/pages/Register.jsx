import React, {useState} from 'react';
import {Link, useNavigate} from "react-router";
import Logo from "../images/logo.png";
import axios from "axios";

function Register() {
    const [input, setInput] = useState({
        username: "",
        password: "",
        email: ""
    });

    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setInput(previous => ({ ...previous, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.email || !input.username || !input.password) {
            alert("All fields (email, username, password) must be filled in!");
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.email)) {
            setError("Please enter a valid email.");
            return;
        }
        if (input.username.length < 3) {
            setError("Username must be at least 3 characters long.");
            return;
        }
        if (input.password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }
        try {
            await axios.post("http://localhost:3000/api/auth/register", input);
            navigate("/login");
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
                <h1>Sign up</h1>
                <form>
                    <input required type="email" placeholder="E-mail" onChange={handleChange} name="email" />
                    <input required type="text" placeholder="Username" onChange={handleChange} name="username" />
                    <input required type="password" placeholder="Password" onChange={handleChange} name="password" />
                    <button type="submit" onClick={handleSubmit}>Sign up</button>
                    {error && <p><b>{error}</b></p>}
                    <span>Already have an account? <Link to="/login">Log in</Link></span>
                </form>
            </div>
        </div>
    );
}

export default Register;