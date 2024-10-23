import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import ResidentialManagementInterface from "./pages/ResidentialManagementInterface";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "./context/Themecontext";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ThemeProvider>
        <ResidentialManagementInterface />
      </ThemeProvider>

      <ToastContainer />
    </>
  );
}

export default App;
