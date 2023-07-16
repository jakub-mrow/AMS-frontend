import { useState } from 'react';
import { AlertColor, TextField } from "@mui/material"
import { Link } from 'react-router-dom';
import { IconButton, InputAdornment, Snackbar, Alert } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FaDollarSign } from 'react-icons/fa';
import { authenticateLogin } from '../../api/authRequests';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";



const LoginForm = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showAlert, setShowAlert] = useState<string | null>(null);
    const [alertSeverity, setAlertSeverity] = useState<AlertColor>("error");

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    let navigate = useNavigate();
    const changeToMainRoute = () => { 
        const path = "/"; 
        navigate(path);
    }

    const {register, handleSubmit, formState: { errors }} = useForm();

    const onSubmit = async () => {
        try{
            const response = await authenticateLogin(username, password);

            if (response.success){
                setAlertSeverity("success");
                setShowAlert(response.message as string);
                setTimeout(() => {
                    changeToMainRoute();
                }, 2000);

            } else {
                setAlertSeverity("error");
                setShowAlert(response.message as string);
            }

        } catch(e){
            console.log(e);
        }
    }

    return (
        <>
            <div className="w-48 h-48 flex items-center justify-center rounded-full bg-gradient-to-br from-primary via-purple-500 to-primary">
                <FaDollarSign className="h-24 w-24 text-white" />
            </div>

            <h1 className="text-6xl font-semibold mt-20">Welcome to AMS!</h1>
            <div className="text-center">
                <p className="text-xl mt-4 whitespace-normal">Asset management system is the best place to keep track of all your investments</p>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-14">
                    <TextField 
                        id="username" 
                        label="Username" 
                        variant="outlined" 
                        className="w-96"
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>
                <div className="mt-8">
                    <TextField
                        id="password"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        className="w-96"
                        onChange={(event) => setPassword(event.target.value)}
                        InputProps={{
                            endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleTogglePasswordVisibility}>
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                            ),
                        }}
                    />
                    <div className="flex justify-end mt-2">
                        <button className="text-primary">
                            Forgot password
                        </button>
                    </div>
                </div>
                <div className="mt-12">
                    <button 
                        className="w-full mt-4 h-12 text-xl bg-primary text-white rounded-xl shadow-lg" 
                        type="submit" >
                        Sign in
                    </button>
                </div>
            
            </form>

            <div className="flex items-center mt-4">
                <h1>Don't have an account yet?</h1>
                <Link to="/register" className="text-primary ml-4">
                    Sign up now
                </Link>
            </div>
    
            <Snackbar 
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}} 
                key={'bottom' + 'right'} 
                open={showAlert !== null} 
                autoHideDuration={5000} 
                onClose={() => setShowAlert(null)}>
                    <Alert severity={alertSeverity}>{showAlert}</Alert>
            </Snackbar>
        </>
    )
}

export default LoginForm;