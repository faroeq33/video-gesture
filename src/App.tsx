// import WebCamExample from "./components/misc/webcam-example/WebCamExample";
import WebcamWrapper from "./components/misc/webcam-example/WebCamWrapper";
import { PoseProvider } from "./context/PoseContext";
// import Home from "./pages/Home";

function App() {
  return (
    <>
      <PoseProvider>
        {/* <Home /> */}
        <WebcamWrapper />
        {/* <WebCamExample /> */}
      </PoseProvider>
    </>
  );
}

export default App;
