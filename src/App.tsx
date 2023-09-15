import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import AppRoutes from "./AppRoutes.tsx";
import AppBar from "./appBar/AppBar.tsx";
import { SnackbarContextProvider } from "./snackbar/SnackbarContextProvider.tsx";

function App() {
  return (
    <SnackbarContextProvider>
      <header>
        <AppBar />
      </header>
      <main>
        <AppRoutes />
      </main>
    </SnackbarContextProvider>
  );
}

export default App;
