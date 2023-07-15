import {Route, Routes} from "react-router-dom";
import Home from "./home/Home.tsx";
import { Wallets } from "./wallets/Wallets.tsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/wallets" element={<Wallets />} />
    </Routes>
  );
}

export default AppRoutes