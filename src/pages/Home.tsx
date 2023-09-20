import {Typography} from "@mui/material";
import { useContext } from "react";
import AuthContext from "../auth/auth-context";

const Home = () => {
  const {isLoggedIn, token} = useContext(AuthContext);
  console.log(isLoggedIn);
  console.log(token);

  return <Typography variant="h1">Hello AMS</Typography>
}

export default Home