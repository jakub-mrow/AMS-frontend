import { Route, Routes } from "react-router-dom";
import Home from "./home/Home.tsx";
import { Accounts } from "./accounts/Accounts.tsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/accounts" element={<Accounts />} />
    </Routes>
  );
};

export default AppRoutes;
