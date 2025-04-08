import Home from "@/pages/home";
import { PoseProvider } from "@/context/posecontext/pose-context";

export default function App() {
  return (
    <>
      <PoseProvider>
        <Home />
      </PoseProvider>
    </>
  );
}
