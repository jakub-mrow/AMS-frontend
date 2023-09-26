import { TextField } from "@mui/material"
import { Link } from 'react-router-dom';
import { IconButton, InputAdornment, Snackbar, Alert } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FaDollarSign } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { useRegister } from './use-register';


const RegisterForm = () => {
    const {
        showPassword,
        showAlert,
        alertSeverity,
        updateUsername,
        updatePassword,
        updateRepeatedPassword,
        onSubmit,
        togglePasswordVisibility,
        updateAlertText,
        updateEmail
    } = useRegister();
    
    const {register, handleSubmit, formState: { errors }} = useForm();

    return (
        <>
            <div className="w-48 h-48 flex items-center justify-center rounded-full bg-gradient-to-br from-primary via-purple-500 to-primary">
                <FaDollarSign className="h-24 w-24 text-white" />
            </div>

            <div className="text-center">
                <h1 className="text-6xl font-semibold mt-20 whitespace-normal">Create your AMS account</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-14">
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
                        id="email" 
                        label="Email" 
                        variant="outlined" 
                        className="w-96"
                        onChange={(event) => updateEmail(event.target.value)}
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
                                <IconButton onClick={togglePasswordVisibility}>
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                            ),
                        }}
                    />
                </div>
                <div className="mt-8">
                    <TextField
                        id="repeatPassword"
                        label="Repeat Password"
                        type={showPassword ? 'text' : 'password'}
                        onChange={(event) => updateRepeatedPassword(event.target.value)}
                        className="w-96"
                        InputProps={{
                            endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={togglePasswordVisibility}>
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                            ),
                        }}
                    />
                </div>
                <div className="mt-16">
                    <button 
                        className="w-full mt-4 h-12 text-xl bg-primary text-white rounded-xl shadow-lg" 
                        type="submit" >
                        Register
                    </button>
                </div>

                <div className="flex items-center justify-center mt-8">
                    <div className="border-b-2 w-1/3"></div>
                    <div className="border-b-2 w-1/3"></div>
                </div>

                <div className="flex justify-center items-center mt-4">
                    <Link to="/login" className="text-primary ml-4">
                        Back
                    </Link>
                </div>
            </form>
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

export default RegisterForm