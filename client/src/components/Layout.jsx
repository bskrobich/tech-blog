import { Outlet } from "react-router";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

function Layout () {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
};

export default Layout;
