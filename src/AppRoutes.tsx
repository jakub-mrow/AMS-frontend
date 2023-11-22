import { Route, Routes } from "react-router-dom";
import Home from "./home/Home.tsx";
import Login from "./login/Login.tsx";
import Register from "./login/Register.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import AssetDetails from "./assetDetails/AssetDetails.tsx";
import { AccountDetails } from "./accountDetails/AccountDetails.tsx";
import { StockDetails } from "./stockDetails/StockDetails.tsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/accounts/:id"
        element={
          <ProtectedRoute>
            <AccountDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/accounts/:accountId/assets/:isin"
        element={
          <ProtectedRoute>
            <StockDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/assets/:assetCode"
        element={
          <ProtectedRoute>
            <AssetDetails />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
