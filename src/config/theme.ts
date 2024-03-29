import {createTheme} from "@mui/material";

declare module '@mui/material/styles/createPalette' {
  interface PaletteOptions {
    white?: {
      main: string;
    }
    black?: {
      main: string;
    }
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    white?: true;
    black?: true;
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#275CC4",
    },
    secondary: {
      main: "#C49427",
    },
    white: {
      main: "#ffffff",
    },
    black: {
      main: "#000000",
    },
  },
});

export default theme;