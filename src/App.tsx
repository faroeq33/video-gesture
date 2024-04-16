import WebcamLayout from "./layouts/WebcamLayout";
import { useClassification } from "./hooks/usePrediction";
import { useState } from "react";
import { Coordinate } from "./utils/convertPosetoVector";
import MyButton from "./components/MyButton";

function App() {
  const [poseData, setPoseData] = useState<Coordinate[][] | []>([]);

  // ts-expect-error - Property 'ml5' does not exist on type 'Window & typeof globalThis'.
  const classification = useClassification(poseData, {
    tolerance: 0.8,
  });

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        {/* {JSON.stringify(poseData[0])} */}
        <WebcamLayout poseData={poseData} setPoseData={setPoseData} />
        <div className="p-4 instructions">
          <h2 className="text-2xl">Instructions</h2>
          <p>Press play first before doing poses</p>
          <p> Open your hand = pausing </p>
          <p> Peacesign = fullscreen</p>
          <p> finger in front of the mouth = mute</p>
        </div>
        {/*
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
        */}

        <div className="p-4 prediction">
          {/* <p>
            PredictionCount{" "}
            <span className="italic font-bold">{predictionCount}</span>{" "}
          </p> */}
          <MyButton
            onClick={() => {
              classification.toggle();
            }}
          >
            {classification.isClassifying
              ? "Stop classifying"
              : "Start  classifying"}
          </MyButton>
          <p>
            <span className="italic font-bold">
              {classification.isClassifying ? classification.result : ""}
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
