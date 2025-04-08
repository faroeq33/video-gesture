import Home from "@/pages/home";
import { PoseProvider } from "@/context/posecontext/pose-context";
import ReactDOM from "react-dom/client";
import "./assets/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <PoseProvider>
    <Home />
  </PoseProvider>
  // </React.StrictMode><React.StrictMode>
);
