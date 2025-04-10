import { useRef } from "react";
import YouTube, { YouTubePlayer, YouTubeProps } from "react-youtube";
import { throttle } from "../utils/throttle";
// import ActionButton from "@/components/action-button";

export default function VideoPlayer(props: { classification: string }) {
  //   const [isReady, setIsReady] = useState(false);
  // console.log(YouTube.PlayerState);
  const callCount = useRef(0);
  const player = useRef<YouTubePlayer | null>(null);

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    player.current = event.target;
    console.log("Video is ready");
    // access to player in all event handlers via event.target
  };

  const options: YouTubeProps["opts"] = {
    height: "390",
    width: "640",
    // height: "390",
    // width: "640",

    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  /* The <iframe> (and video player) will replace this <div> tag.*/

  // const fullScreen = async () => {
  //   const iframe = await player.current?.getIframe();

  //   const requestFullScreen =
  //     // @ts-expect-error - Property 'requestFullScreen' does not exist on type 'HTMLIFrameElement'.
  //     iframe?.requestFullScreen ||
  //     // @ts-expect-error - Property 'requestFullScreen' does not exist on type 'HTMLIFrameElement'.
  //     iframe?.mozRequestFullScreen ||
  //     // @ts-expect-error - Property 'requestFullScreen' does not exist on type 'HTMLIFrameElement'.
  //     iframe?.webkitRequestFullScreen;
  //   if (requestFullScreen) {
  //     requestFullScreen.bind(iframe)();
  //   }
  // };

  function handlePoseEvent(classification: string) {
    // Maybe i can apply debounce/throttle here
    if (!player.current) return;

    const muteIsThrottled = throttle({
      callCount: callCount.current,
    });

    if (muteIsThrottled) {
      return;
    }

    switch (classification) {
      case "mute":
        {
          const mute = async () => {
            try {
              player.current?.mute();
              console.log(`callcount is: ${callCount.current}`);
              callCount.current = callCount.current + 1;
              console.log("callCount after incrementing: " + callCount.current);
            } catch (err) {
              console.error(err);
            }
          };
          mute();
        }

        break;
      case "fullscreen":
        // console.log(
        //   "not implemented yet, because of security reasons, see projects readme"
        // );
        // console.log("entered fullscreen");
        // throttle({
        //   callCount: callCount.current,
        //   action: fullScreen,
        // });

        break;
      case "pause":
        // fire pause event
        // throttle({
        //   callCount: callCount.current,
        //   action: player.current.mute,
        // });

        break;
      default:
        break;
    }
  }

  if (props.classification) {
    handlePoseEvent(props.classification);
  }

  return (
    <>
      <YouTube
        className="w-full h-96"
        videoId="xwtdhWltSIg"
        title="How to read multi-tariff smart meter EMDI ES-10B"
        opts={options}
        onReady={onPlayerReady}
      />{" "}
      {/* <ActionButton onClick={mute}>mute</ActionButton> */}
      {/* <ActionButton onClick={fullScreen}>fullscreen</ActionButton> */}
    </>
  );
}
