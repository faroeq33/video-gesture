import { PoseProvider } from "./context/PoseContext";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <PoseProvider>
        <Home />
      </PoseProvider>
    </>
  );
}

export default App;
