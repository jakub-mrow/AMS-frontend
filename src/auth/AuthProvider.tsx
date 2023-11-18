import React, { useEffect, useState } from "react";
import AuthContext from "./auth-context";
import { authenticateLogin } from "../login/authRequests";
import { ApiResponse } from "../login/apiResponse";
import { useNavigate } from "react-router-dom";

const AuthProvider = (props: any) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [token, setToken] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token")){
            const token = localStorage.getItem("token");
            setToken(token!);
            setIsLoggedIn(true);
        }

    }, []);

    const loginHandler = async (username: string, password: string) => {
        const response: ApiResponse = await authenticateLogin(username, password);
    
        if (response.success) {
            const accessToken = response.data.access;
            const refreshToken = response.data.refresh;
            setToken(accessToken);
            setIsLoggedIn(true);
            localStorage.setItem("token", accessToken);
            navigate("/");
        }
        
        return response;
    };

    const logoutHandler = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        setToken("");
        navigate("/login");
    };

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: isLoggedIn,
                token: token,
                onLogin: loginHandler,
                onLogout: logoutHandler,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}


export default AuthProvider;