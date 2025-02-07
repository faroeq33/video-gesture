import Home from "@/pages/home";
import { PoseProvider } from "@/context/posecontext/PoseContext";

export default function App() {
  return (
    <>
      <PoseProvider>
        <Home />
      </PoseProvider>
    </>
  );
}
