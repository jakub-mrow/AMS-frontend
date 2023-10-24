import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../snackbar/use-snackbar.ts";
import { Severity } from "../snackbar/snackbar-context.ts";
import { useContext } from "react";
import AuthContext from "../auth/auth-context";

const Home = () => {
  const navigate = useNavigate();
  const alert = useSnackbar();
  useContext(AuthContext);
  return (
    <>
      <Typography variant="h1">Hello AMS</Typography>
      <Button variant="contained" onClick={() => navigate("/accounts")}>
        Accounts
      </Button>
      <Button onClick={() => alert("Snackbar is working!", Severity.SUCCESS)}>
        Snackbar
      </Button>
      <Button onClick={() => alert("Snackbar is working!", Severity.ERROR)}>
        Other snackbar
      </Button>
    </>
  );
};

export default Home;
