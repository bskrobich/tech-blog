import {createContext, useEffect, useState} from "react";
import axios from "axios";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
    }, [user]);

    const login = async (input) => {
        const res = await axios.post("http://localhost:3000/api/auth/login", input);
        setUser(res.data);
    };

    const logout = async () => {
        await axios.post("http://localhost:3000/api/auth/logout");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};