import WebcamLayout from "./layouts/WebcamLayout";
import { usePrediction } from "./hooks/usePrediction";
import { useRef, useState } from "react";
import { HandLandmarker } from "@mediapipe/tasks-vision";
import { Coordinate } from "./utils/convertPosetoVector";

function App() {
  const landmarkerRef = useRef<HandLandmarker | null>(null);
  const [poseData, setPoseData] = useState<Coordinate[][] | []>([]);

  // ts-expect-error - Property 'ml5' does not exist on type 'Window & typeof globalThis'.
  const { prediction } = usePrediction(poseData);

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        {/* {JSON.stringify(poseData[0])} */}
        <WebcamLayout
          poseData={poseData}
          setPoseData={setPoseData}
          landmarkerRef={landmarkerRef}
        />
        <div className="p-4 instructions">
          <h2 className="text-2xl">Instructions</h2>
          <p>Press play first before doing poses</p>
          <p> Open your hand = pausing </p>
          <p> Peacesign = fullscreen</p>
          <p> finger in front of the mouth = mute</p>
        </div>
        <div className="p-4 card">
          <h1 className="text-3xl font-bold underline">Video gestures</h1>
          <>
            <iframe
              className="w-full h-96"
              src="https://www.youtube.com/embed/UNw-3mOEN-0"
              title="How to read multi-tariff smart meter EMDI ES-10B"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen={true}
            />
          </>
        </div>

        <div className="p-4 prediction">
          {/* <p>
            PredictionCount{" "}
            <span className="italic font-bold">{predictionCount}</span>{" "}
          </p> */}
          <p>
            <span className="italic font-bold">{prediction}</span>{" "}
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
