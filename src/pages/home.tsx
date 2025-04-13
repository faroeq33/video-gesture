import { usePoseContext } from "@/context/posecontext/use-pose-context";
import useClassification from "@/hooks/use-nn-classification";
import WebcamLayout from "@/components/webcam-layout";
import ActionButton from "@/components/action-button";
import VideoPlayer from "@/components/video-player";
import { Menu, PauseIcon, PlayIcon } from "lucide-react";
import { useDebounce } from "use-debounce";
import Footer from "@/components/footer";
import Paragraph from "@/components/paragraph";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
      <div className="container grid grid-cols-2 gap-4 mx-auto w-8/10 ">
        <div className="gap-4 pt-4 prediction">
          <ActionButton
            onClick={() => {
              classifier.toggle();
            }}
          >
            {classifier.isClassifying ? (
              <div className="flex items-center ">
                <PauseIcon />
                Stop classifying
              </div>
            ) : (
              <div className="flex items-center ">
                <PlayIcon />
                Start classifying
              </div>
            )}
          </ActionButton>
          <Popover>
            <PopoverTrigger>
              <ul className="flex items-center justify-around hover:cursor-pointer">
                <li>
                  <Menu />
                </li>
                <li>Instructions</li>
              </ul>
            </PopoverTrigger>
            <PopoverContent>
              <ul className="space-y-2 list-disc list-inside ">
                <h2 className="mb-2 text-2xl font-bold ">Instructions</h2>
                <li>Press play first before doing poses</li>
                <li>
                  Open your <b>RIGHT</b> hand ✋🏿 = pausing
                </li>
                <li>Peace sign ✌🏿️ = fullscreen</li>
                <li>Finger in front of the mouth ☝🏿 = mute</li>
              </ul>
            </PopoverContent>
          </Popover>

          <h1 className="text-xl text-accent-foreground">
            An app for people who want to control music through gestures, for
            example while driving, or when when you don't feel like using a
            mouse!
          </h1>
        </div>
        <div className="my-8 text-4xl classification display">
          <span className="italic font-bold">
            <Paragraph>
              Current pose:
              {" " + classifier.classification || " No poses recognized"}
            </Paragraph>
          </span>
        </div>
        <div className="">
          <WebcamLayout poseData={poseData} setPoseData={setPoseData} />
        </div>

        <VideoPlayer classification={debouncedClassification} />
      </div>

      <div className="grid my-10 bg-indigo-300/20">
        <Footer />
      </div>
    </>
  );
}
