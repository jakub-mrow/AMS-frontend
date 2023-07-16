import LoginForm from '../components/login/LoginForm';
import LoginPanel from '../components/login/LoginPanel';

const Login = () => {
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