import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import AppRoutes from "./AppRoutes.tsx";
import AppBar from "./appBar/AppBar.tsx";

function App() {
  return (
    <>
      {/* <header>
        <AppBar />
      </header> */}
      <main>
        <AppRoutes />
      </main>
    </>
  );
}

export default App;
