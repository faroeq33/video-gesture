import { useRef } from "react";
import YouTube, { YouTubePlayer, YouTubeProps } from "react-youtube";
// import ActionButton from "@/components/action-button";

export default function VideoPlayer(props: { classification: string }) {
  //   const [isReady, setIsReady] = useState(false);
  // console.log(YouTube.PlayerState);
  const player = useRef<YouTubePlayer>(null);

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    player.current = event.target;
    console.log("Video is ready");
    // access to player in all event handlers via event.target
  };

  const options: YouTubeProps["opts"] = {
    height: "390",
    width: "640",

    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  /* The <iframe> (and video player) will replace this <div> tag.*/

  const fullScreen = async () => {
    const iframe = await player.current.getIframe();

    const requestFullScreen =
      // @ts-expect-error - Property 'requestFullScreen' does not exist on type 'HTMLIFrameElement'.
      iframe.requestFullScreen ||
      // @ts-expect-error - Property 'requestFullScreen' does not exist on type 'HTMLIFrameElement'.
      iframe.mozRequestFullScreen ||
      // @ts-expect-error - Property 'requestFullScreen' does not exist on type 'HTMLIFrameElement'.
      iframe.webkitRequestFullScreen;
    if (requestFullScreen) {
      requestFullScreen.bind(iframe)();
    }
  };

  function handlePoseEvent(classification: string) {
    // Maybe i can apply debounce/throttle here
    switch (classification) {
      case "mute":
        console.log("entered mute logic");
        player.current.mute();
        break;
      case "fullscreen":
        // console.log(
        //   "not implemented yet, because of security reasons, see projects readme"
        // );
        console.log("entered fullscreen");

        fullScreen();
        break;
      case "pause":
        // fire pause event
        console.log("thing paused");

        player.current.pauseVideo();
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
