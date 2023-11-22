import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AuthContext from "./auth/auth-context"; // Assuming AuthContext is exported as AuthContext

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const location = useLocation();
  const path = location.pathname;
  if (!isLoggedIn) {
    return <Navigate to={"/login?redirect=" + path} />;
  }

  return children;
};

export default ProtectedRoute;
