import { usePoseContext } from "@/context/posecontext/use-pose-context";
import useClassification from "@/hooks/use-nn-classification";
import WebcamLayout from "@/components/webcam-layout";
import ActionButton from "@/components/action-button";
import VideoPlayer from "@/components/video-player";
import { PauseIcon, PlayIcon } from "lucide-react";
import { useDebounce } from "use-debounce";
import Footer from "@/components/footer";

export default function Home() {
  const { poseData, setPoseData } = usePoseContext();

  const classifier = useClassification(poseData, {
    tolerance: 0.8,
  });

  const [debouncedClassification] = useDebounce(
    classifier.classification,
    300,
    {
      leading: false,
    }
  );

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 prediction">
          <ActionButton
            onClick={() => {
              classifier.toggle();
            }}
          >
            {classifier.isClassifying ? (
              <div className="flex items-center">
                <PauseIcon />
                Stop classifying
              </div>
            ) : (
              <div className="flex items-center">
                <PlayIcon />
                Start classifying
              </div>
            )}
          </ActionButton>
        </div>
        <div className="my-8 text-4xl text-black classification display">
          <span className="italic font-bold">
            <p>
              Actual value:
              {classifier.classification || "No poses recognized"}
            </p>
            <p>Debounce value: {debouncedClassification}</p>
          </span>
        </div>
        <div className="p-4">
          <WebcamLayout poseData={poseData} setPoseData={setPoseData} />
          <div className="text-yellow-700 bg-yellow-100 rounded-md border-l-4 border-yellow-500 shadow-md card">
            <ul className="p-4 space-y-2 list-disc list-inside">
              <h2 className="mb-2 text-2xl font-bold">Instructions</h2>
              <li>Press play first before doing poses</li>
              <li>
                Open your <b>RIGHT</b> hand ✋🏿 = pausing
              </li>
              <li>Peace sign ✌🏿️ = fullscreen</li>
              <li>Finger in front of the mouth ☝🏿 = mute</li>
            </ul>
          </div>
        </div>

        <VideoPlayer classification={debouncedClassification} />
      </div>

      <div className="grid">
        <Footer />
      </div>
    </>
  );
}
