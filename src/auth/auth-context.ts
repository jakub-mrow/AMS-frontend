import React from "react";
import { ApiResponse } from "../login/apiResponse";

type AuthContextType = {
    token: string;
    isLoggedIn: boolean;
    onLogin: (username: string, password: string) => Promise<ApiResponse>; // Update the return type here
    onLogout: () => void;
  };

const AuthContext = React.createContext<AuthContextType>({
  token: "",
  isLoggedIn: false,
  onLogin: async (username: string, password: string) => {
    throw new Error("onLogin not implemented");
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onLogout: () => {},
});

export default AuthContext;