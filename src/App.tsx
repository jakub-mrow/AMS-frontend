import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import AppRoutes from "./AppRoutes.tsx";
import AppBar from "./appBar/AppBar.tsx";
import { SnackbarContextProvider } from "./snackbar/SnackbarContextProvider.tsx";
import { useLocation } from "react-router-dom";


function App() {
  const location = useLocation();
  const showHeader = location.pathname !== "/login" && location.pathname !== "/register";
  return (
    <SnackbarContextProvider>
      {showHeader && (
        <header>
          <AppBar />
        </header>
      )}
      <main>
        <AppRoutes />
      </main>
    </SnackbarContextProvider>
  );
}

export default App;
