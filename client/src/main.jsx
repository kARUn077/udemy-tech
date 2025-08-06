import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { appStore } from "./app/store";
import { Toaster } from "./components/ui/sonner";
import CustomLoader from "./components/CustomLoader"; // ✅ Now it's safe

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={appStore}>
      <CustomLoader>
        <App />
        <Toaster />
      </CustomLoader>
    </Provider>
  </StrictMode>
);
