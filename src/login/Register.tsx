import RegisterForm from './RegisterForm';
import LoginPanel from './LoginPanel';
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import AuthContext from '../auth/auth-context';

const Register = () => {
    const { isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (isLoggedIn) {
            navigate("/");
        }
    }, [isLoggedIn, navigate]);
    
    return (
        <div className="flex w-full h-screen overflow-hidden">
            <div className="hidden lg:flex flex-col h-full w-1/2 items-center justify-center bg-primary">
                <LoginPanel/>
            </div>
            <div className="flex items-center justify-center w-full lg:w-1/2 p-50">
                <RegisterForm/>
            </div>
        </div>
    )
}

export default Register;