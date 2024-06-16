import WebcamLayout from "./layouts/WebcamLayout";
// import { useClassification } from "./hooks/useClassification";
import { useState } from "react";
import { Coordinate } from "./utils/convertPosetoVector";
import MyButton from "./components/buttons/MyButton";
import VideoPlayer from "./components/VideoPlayer";

function handlePoseEvent(classification: string) {
  switch (classification) {
    case "pause":
      console.log("thing paused");

      // fire pause event
      break;

    default:
      break;
  }
}

function App() {
  const [poseData, setPoseData] = useState<Coordinate[][] | []>([]);

  // ts-expect-error - Property 'ml5' does not exist on type 'Window & typeof globalThis'.
  // const classification = useClassification([], {
  //   tolerance: 0.8,
  // });

  // console.log("prediction count", classification.predictionCount);

  // const MockClassicationPose = "pause";

  // handlePoseEvent(classification.classification);

  // gebruik mock data voor het testen voor het vuren van events
  // classificiationInput = "pause": Dit komt bij de echt versie vanuit classification state
  // if "pause" then fire pause event
  // write pause event
  // if "fullscreen" then fire pause event
  // if "" then fire pause event

  // console.log(classification.isClassifying);

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <VideoPlayer />
        {/* {JSON.stringify(poseData[0])} */}
        <p>
          <span className="italic font-bold">
            {/* {classification.classification ?? "No classification"} */}
          </span>
        </p>
        <WebcamLayout poseData={poseData} setPoseData={setPoseData} />
        <div className="p-4 instructions">
          <h2 className="text-2xl">Instructions</h2>
          <p>Press play first before doing poses</p>
          <p> Open your hand = pausing </p>
          <p> Peacesign = fullscreen</p>
          <p> finger in front of the mouth = mute</p>
        </div>
        {/*

        */}
        <div className="p-4 prediction">
          {/* <p>
            PredictionCount{" "}
            <span className="italic font-bold">{predictionCount}</span>{" "}
          </p> */}
          <MyButton
            onClick={() => {
              // classification.toggle();
              console.log("pressed");
            }}
          >
            {/* {classification.isClassifying
              ? "Stop classifying"
              : "Start  classifying"} */}
          </MyButton>
        </div>
      </div>
    </>
  );
}

export default App;
