import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home.tsx";
import Login from "./login/Login.tsx"
import Register from "./login/Register.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Home/>
          </ProtectedRoute>}
      />
    </Routes>
  )
}

export default AppRoutes