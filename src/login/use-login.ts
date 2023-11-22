import { useCallback, useContext, useState } from "react";
import { AlertColor } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { ApiResponse } from "./apiResponse";
import AuthContext from "../auth/auth-context";

export const useLogin = () => {
  const authContext = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<string | null>(null);
  const [alertSeverity, setAlertSeverity] = useState<AlertColor>("error");

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();
  const location = useLocation();

  const handleTogglePasswordVisibility = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  const updatePassword = useCallback((password: string) => {
    setPassword(password);
  }, []);

  const updateUsername = useCallback((username: string) => {
    setUsername(username);
  }, []);

  const updateAlertSeverity = useCallback((severity: AlertColor) => {
    setAlertSeverity(severity);
  }, []);

  const updateAlertText = useCallback((text: string | null) => {
    setShowAlert(text);
  }, []);

  const changeToRedirectRoute = useCallback(() => {
    const params = new URLSearchParams(location.search);
    const redirect = params.get("redirect");
    if (redirect) {
      navigate(redirect);
    } else {
      navigate("/");
    }
  }, [location, navigate]);

  const onSubmit = useCallback(async () => {
    try {
      const response: ApiResponse = await authContext.onLogin(
        username,
        password,
      );

      if (response.success) {
        changeToRedirectRoute();
      } else {
        updateAlertSeverity("error");
        updateAlertText(response.message as string);
      }
    } catch (e) {
      console.log(e);
    }
  }, [
    authContext,
    username,
    password,
    changeToRedirectRoute,
    updateAlertSeverity,
    updateAlertText,
  ]);

  return {
    showPassword,
    showAlert,
    alertSeverity,
    username,
    password,
    handleTogglePasswordVisibility,
    updatePassword,
    updateUsername,
    updateAlertSeverity,
    updateAlertText,
    onSubmit,
    changeToRedirectRoute,
  };
};
