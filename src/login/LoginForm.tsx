import { TextField } from "@mui/material"
import { Link } from 'react-router-dom';
import { IconButton, InputAdornment, Snackbar, Alert } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FaDollarSign } from 'react-icons/fa';
import { useForm } from "react-hook-form";
import { useLogin } from './use-login';


const LoginForm = () => {
    const {
        showPassword,
        showAlert,
        alertSeverity,
        handleTogglePasswordVisibility,
        updatePassword,
        updateUsername,
        updateAlertText,
        onSubmit
    } = useLogin();
    
    const {register, handleSubmit, formState: { errors }} = useForm();

    return (
        <>
            <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gradient-to-br from-primary via-purple-500 to-primary mt-4">
                <FaDollarSign className="h-12 w-12 text-white" />
            </div>

            <div className="text-center">
                <h1 className="text-5xl font-semibold mt-10 whitespace-normal">Welcome to AMS!</h1>
                <p className="text-xl mt-4 whitespace-normal">Asset management system is the best place <br/> to keep track of all your investments</p>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-10">
                    <TextField 
                        id="username" 
                        label="Username" 
                        variant="outlined" 
                        className="w-96"
                        onChange={(event) => updateUsername(event.target.value)}
                    />
                </div>
                <div className="mt-8">
                    <TextField
                        id="password"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        className="w-96"
                        onChange={(event) => updatePassword(event.target.value)}
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
                <div className="mt-8">
                    <button 
                        className="w-full mt-4 h-12 text-xl bg-primary text-white rounded-xl shadow-lg select-none" 
                        type="submit" >
                        Sign in
                    </button>
                </div>
            
            </form>

            <div className="flex items-center mt-4 mb-4">
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
                onClose={() => updateAlertText(null)}>
                    <Alert severity={alertSeverity}>{showAlert}</Alert>
            </Snackbar>
        </>
    )
}

export default LoginForm;