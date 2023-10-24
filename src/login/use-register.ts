import { useState, useCallback, useContext } from 'react'
import { AlertColor } from "@mui/material"
import { useNavigate } from 'react-router-dom';
import { registerRequest } from './authRequests';
import { ApiResponse } from './apiResponse';
import AuthContext from '../auth/auth-context';


export const useRegister = () => {
    const authContext = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showRepeatedPassword, setShowRepeatedPassword] = useState<boolean>(false);
    const [showAlert, setShowAlert] = useState<string | null>(null);
    const [alertSeverity, setAlertSeverity] = useState<AlertColor>("error");

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [repeatedPassword, setRepeatedPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    
    const navigate = useNavigate();
    

    const onSubmit = useCallback( async () => {
        const changeToMainRoute = () => { 
            const path = "/"; 
            navigate(path);
        }
        
        try{
            const response = await registerRequest(username, password, email);

            if (response.success){
                const loginResponse: ApiResponse = await authContext.onLogin(username, password);

                if (loginResponse.success){
                    changeToMainRoute();
                } else {
                    setAlertSeverity("error");
                    setShowAlert(response.message as string);
                }

            } else {
                setAlertSeverity("error");
                setShowAlert(response.message as string);
            }

        } catch(e){
            setAlertSeverity("error");
            setShowAlert("Internal server error");
        }
    }, [navigate, username, password, email, authContext]);

    const togglePasswordVisibility = useCallback(() => {
        setShowPassword(!showPassword);
    }, [showPassword]);

    const toggleRepeatedPasswordVisibility = useCallback(() => {
        setShowRepeatedPassword(!showRepeatedPassword);
    }, [showRepeatedPassword]);

    const updateUsername = useCallback((username: string) => {
        setUsername(username);
    }, []);

    const updatePassword = useCallback((password: string) => {
        setPassword(password);
    }, []);

    const updateEmail = useCallback((email: string) => {
        setEmail(email);
    }, []);

    const updateRepeatedPassword = useCallback((repeatedPassword: string) => {
        setRepeatedPassword(repeatedPassword);
    }, []);

    const updateAlertSeverity = useCallback((severity: AlertColor) => {
        setAlertSeverity(severity);
    }, [])

    const updateAlertText = useCallback((text: string | null) => {
        setShowAlert(text);
    }, [])


    return {
        showPassword,
        showRepeatedPassword,
        username,
        password,
        repeatedPassword,
        showAlert,
        alertSeverity,
        email,
        updateUsername,
        updatePassword,
        updateRepeatedPassword,
        onSubmit,
        togglePasswordVisibility,
        toggleRepeatedPasswordVisibility,
        updateAlertSeverity,
        updateAlertText,
        updateEmail
    }
}