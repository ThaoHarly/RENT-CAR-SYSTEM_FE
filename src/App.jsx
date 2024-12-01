import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import ResidentialManagementInterface from "./pages/ResidentialManagementInterface";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "./context/Themecontext";

function App() {
  return (
    <ThemeProvider>
      <ResidentialManagementInterface />
      <ToastContainer /> {/* Keep ToastContainer here */}
    </ThemeProvider>
  );
}


export default App;
