import Home from "@/pages/home";
import { PoseProvider } from "@/context/posecontext/pose-context";
import ReactDOM from "react-dom/client";
import "./assets/index.css";
import { StrictMode } from "react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PoseProvider>
      <Home />
    </PoseProvider>
  </StrictMode>
);
