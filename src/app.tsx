import Home from "@/pages/home";
import { PoseProvider } from "@/context/posecontext/pose-context";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function App() {
  return (
    <>
      <SpeedInsights />
      <PoseProvider>
        <Home />
      </PoseProvider>
    </>
  );
}
