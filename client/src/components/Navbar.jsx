import React from 'react';
import Logo from "../images/logo.png";
import { Link } from "react-router";

function Navbar() {
    return (
        <div className="navbar">
            <div className="container">
                <div className="navbar-logo">
                    <img src={Logo} alt="Logo"/>
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
                    <span className="write">
                        <Link className="write-link" to="/write">Write</Link>
                    </span>
                    <span>Bartosz</span>
                    <span>Logout</span>
                </div>
            </div>
        </div>
    );
}

export default Navbar;