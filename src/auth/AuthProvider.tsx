import { useEffect, useState } from "react";
import AuthContext from "./auth-context";
import { authenticateLogin } from "../login/authRequests";
import { ApiResponse } from "../login/apiResponse";
import { useNavigate } from "react-router-dom";

let initialToken = "";
const tokenFromStorage = localStorage.getItem("token");
if (tokenFromStorage) {
  initialToken = tokenFromStorage;
}
const AuthProvider = (props: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(initialToken !== "");
  const [token, setToken] = useState<string>(initialToken);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = async (username: string, password: string) => {
    const response: ApiResponse = await authenticateLogin(username, password);

    if (response.success) {
      const accessToken = response.data.access;
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
  );
};

export default AuthProvider;
