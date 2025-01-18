import React, {useContext} from 'react';
import Logo from "../images/logo.png";
import {Link, useNavigate} from "react-router";
import {AuthContext} from "../context/authContext.jsx";

function Navbar() {

    const { user, logout } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await logout();
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="navbar">
            <div className="container">
                <div className="navbar-logo">
                    <Link to="/">
                        <img src={Logo} alt="Logo"/>
                    </Link>
                </div>
                <div className="navbar-links">
                    <Link className="link" to="/?category=Tech">
                        <h4>Tech</h4>
                    </Link>
                    <Link className="link" to="/?category=Reviews">
                        <h4>Reviews</h4>
                    </Link>
                    <Link className="link" to="/?category=Science">
                        <h4>Science</h4>
                    </Link>
                    <Link className="link" to="/?category=Entertainment">
                        <h4>Entertainment</h4>
                    </Link>
                    <Link className="link" to="/?category=AI">
                        <h4>AI</h4>
                    </Link>
                    { (user && (user.role === 'Admin' || user.role === 'Author')) && (
                        <span className="write">
                            <Link className="write-link" to="/write">Write</Link>
                        </span>
                    )}
                    { (user && (user.role === 'Admin')) ?
                        <Link className="login-link" to="/admin-dashboard">{user?.username}</Link>
                        : <span>{user?.username}</span>
                    }
                    {user ?
                        <span onClick={handleSubmit}>Logout</span>
                        : <Link className="login-link" to="/login">Login</Link>}
                </div>
            </div>
        </div>
    );
}

export default Navbar;