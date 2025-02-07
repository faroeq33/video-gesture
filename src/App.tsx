import { PoseProvider } from "./context/posecontext/PoseContext";
import Home from "./pages/Home";
// import WebcamWrapper from "./components/WebCamWrapper";

function App() {
  return (
    <>
      <PoseProvider>
        <Home />
        {/* <WebcamWrapper /> */}
      </PoseProvider>
    </>
  );
}

export default App;
