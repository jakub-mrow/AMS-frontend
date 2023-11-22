import AuthContext from "../auth/auth-context";
import LoginForm from "./LoginForm";
import LoginPanel from "./LoginPanel";
import { useContext, useEffect } from "react";
import { useLogin } from "./use-login.ts";

const Login = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const { changeToRedirectRoute } = useLogin();
  useEffect(() => {
    if (isLoggedIn) {
      changeToRedirectRoute();
    }
  }, [isLoggedIn, changeToRedirectRoute]);
  return (
    <div className="flex w-full h-screen">
      <div className="hidden lg:flex flex-col h-full w-1/2 items-center justify-center bg-primary">
        <LoginPanel />
      </div>
      <div className="w-full flex flex-col items-center justify-center lg:w-1/2 p-50">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
