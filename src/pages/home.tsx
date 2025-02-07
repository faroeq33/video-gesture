// import VideoPlayer from "../components/VideoPlayer";
import { usePoseContext } from "@/context/posecontext/use-pose-context";
import useClassification from "@/hooks/use-classification";
import WebcamLayout from "@/components/webcam-layout";
import ActionButton from "@/components/action-button";
import VideoPlayer from "@/components/video-player";

export default function Home() {
  const { poseData, setPoseData } = usePoseContext();

  const classification = useClassification(poseData, {
    tolerance: 0.8,
  });

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="p-4 prediction">
        <ActionButton
          onClick={() => {
            classification.toggle();
            console.log("toggled classification");
          }}
        >
          {classification.isClassifying
            ? "Stop classifying"
            : "Start  classifying"}
        </ActionButton>
      </div>
      <div className="my-8 text-4xl text-black classification display">
        <span className="italic font-bold">
          {classification.classification || "No poses recognized"}
        </span>
      </div>
      <div className="p-4 instructions">
        <WebcamLayout poseData={poseData} setPoseData={setPoseData} />
        <h2 className="text-2xl">Instructions</h2>
        <p>Press play first before doing poses</p>
        <p>Open your hand ✋🏿 = pausing </p>
        <p>Peacesign ✌🏿️ = fullscreen</p>
        <p>Finger in front of the mouth ☝🏿 = mute</p>
      </div>

      <VideoPlayer classification={classification.classification} />
    </div>
  );
}
