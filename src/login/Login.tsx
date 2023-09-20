import AuthContext from '../auth/auth-context';
import LoginForm from './LoginForm';
import LoginPanel from './LoginPanel';
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);
  return (
    <div className="flex w-full h-screen">
      <div className="hidden lg:flex flex-col h-full w-1/2 items-center justify-center bg-primary">
        <LoginPanel/>
      </div>
      <div className="w-full flex flex-col items-center justify-center lg:w-1/2 p-50">
        <LoginForm/>
      </div>
    </div>
  )
}

export default Login;