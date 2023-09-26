import { useState, useCallback } from 'react'
import { AlertColor } from "@mui/material"
import { useNavigate } from 'react-router-dom';
import { registerRequest } from './authRequests';


export const useRegister = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showAlert, setShowAlert] = useState<string | null>(null);
    const [alertSeverity, setAlertSeverity] = useState<AlertColor>("error");

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [repeatedPassword, setRepeatedPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    
    let navigate = useNavigate();
    const changeToMainRoute = () => { 
        const path = "/"; 
        navigate(path);
    }

    const onSubmit = useCallback( async () => {
        try{
            const response = await registerRequest(username, password, email);

            if (response.success){
                changeToMainRoute();

            } else {
                setAlertSeverity("error");
                setShowAlert(response.message as string);
            }

        } catch(e){
            setAlertSeverity("error");
            setShowAlert("Internal server error");
        }
    }, [username, password, email]);

    const togglePasswordVisibility = useCallback(() => {
        setShowPassword(!showPassword);
    }, []);

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
        updateAlertSeverity,
        updateAlertText,
        updateEmail
    }
}