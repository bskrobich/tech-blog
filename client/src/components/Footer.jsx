import React from 'react';
import Logo from "../images/logo.png";

function Footer() {
    return (
        <footer>
            <img src={Logo} alt="Logo"/>
            <span>
                © 2025 <b>Geek Speak.</b> All Rights Reserved.
            </span>
        </footer>
    );
}

export default Footer;