import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "./auth/auth-context"; // Assuming AuthContext is exported as AuthContext

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isLoggedIn } = useContext(AuthContext);

    if (!isLoggedIn) {
        console.log(isLoggedIn);
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;