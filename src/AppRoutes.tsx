import { Route, Routes } from "react-router-dom";
import Home from "./home/Home.tsx";
import { Accounts } from "./accounts/Accounts.tsx";
import { AccountDetails } from "./accountDetails/AccountDetails.tsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/accounts" element={<Accounts />} />
      <Route path="/accounts/:id" element={<AccountDetails />} />
    </Routes>
  );
};

export default AppRoutes;
