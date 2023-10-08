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
        showRepeatedPassword,
        updateUsername,
        updatePassword,
        updateRepeatedPassword,
        onSubmit,
        togglePasswordVisibility,
        toggleRepeatedPasswordVisibility,
        updateAlertText,
        updateEmail
    } = useRegister();
    
    const {register, handleSubmit, formState: { errors }} = useForm();

    return (
        <div className="flex flex-col items-center justify-center space-y-10 m-8">
            <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gradient-to-br from-primary via-purple-500 to-primary">
                <FaDollarSign className="h-12 w-12 text-white" />
            </div>

            <div className="text-center">
                <h1 className="text-4xl font-semibold whitespace-normal">Create your AMS account</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="flex flex-col items-center justify-center space-y-2">
                    <TextField 
                        id="username" 
                        label="Username" 
                        variant="outlined" 
                        className="w-96"
                        onChange={(event) => updateUsername(event.target.value)}
                    />
                    <TextField 
                        id="email" 
                        label="Email" 
                        variant="outlined" 
                        className="w-96"
                        onChange={(event) => updateEmail(event.target.value)}
                    />
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
                    <TextField
                        id="repeatPassword"
                        label="Repeat Password"
                        type={showRepeatedPassword ? 'text' : 'password'}
                        onChange={(event) => updateRepeatedPassword(event.target.value)}
                        className="w-96"
                        InputProps={{
                            endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={toggleRepeatedPasswordVisibility}>
                                {showRepeatedPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                            ),
                        }}
                    />
                </div>
                <div className="flex flex-col items-center justify-center space-y-4">
                    <button 
                        className="w-full h-12 text-xl bg-primary text-white rounded-xl shadow-lg" 
                        type="submit">
                        Register
                    </button>
                    <div className="border-b-2 w-4/5"></div>
                    <Link to="/login" className="text-primary">
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
        </div>
    )
}

export default RegisterForm