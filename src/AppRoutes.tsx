import { Route, Routes } from "react-router-dom";
import Home from "./home/Home.tsx";
import { Accounts } from "./accounts/Accounts.tsx";
import Login from "./login/Login.tsx"
import Register from "./login/Register.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import {AccountDetails} from "./accountDetails/AccountDetails.tsx";
import TradingViewWidget from "./assetDetails/TradingViewWidget.tsx";
import AssetDetails from "./assetDetails/AssetDetails.tsx";

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
      <Route
        path="/accounts"
        element={
          <ProtectedRoute>
            <Accounts />
          </ProtectedRoute>}
      />
      <Route
        path="/accounts/:id"
        element={
          <ProtectedRoute>
            <AccountDetails />
          </ProtectedRoute>}
      />
      <Route
        path="/chart"
        element={
          <ProtectedRoute>
            <AssetDetails/>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
