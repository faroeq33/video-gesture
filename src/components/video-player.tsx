import { useRef } from "react";
import YouTube, { YouTubePlayer, YouTubeProps } from "react-youtube";
// import ActionButton from "@/components/action-button";

export default function VideoPlayer(props: { classification: string }) {
  // const callCount = useRef(0);
  const player = useRef<YouTubePlayer | null>(null);

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    player.current = event.target;
    console.log("Video is ready");
    // access to player in all event handlers via event.target
  };

  const options: YouTubeProps["opts"] = {
    width: "480",
    height: "270",
    // height: "390",
    // width: "640",

    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  /* The <iframe> (and video player) will replace this <div> tag.*/

  const fullScreen = async () => {
    const iframe = await player.current?.getIframe();

    const requestFullScreen =
      // @ts-expect-error - Property 'requestFullScreen' does not exist on type 'HTMLIFrameElement'.
      iframe?.requestFullScreen ||
      // @ts-expect-error - Property 'requestFullScreen' does not exist on type 'HTMLIFrameElement'.
      iframe?.mozRequestFullScreen ||
      // @ts-expect-error - Property 'requestFullScreen' does not exist on type 'HTMLIFrameElement'.
      iframe?.webkitRequestFullScreen;
    if (requestFullScreen) {
      requestFullScreen.bind(iframe)();
    }
  };

  function handlePoseEvent(classification: string) {
    if (!player.current) return;

    switch (classification) {
      case "mute":
        {
          const mute = async () => {
            try {
              player.current?.mute();
              // console.log(`callcount is: ${callCount.current}`);
              // callCount.current = callCount.current + 1;
              // console.log("callCount after incrementing: " + callCount.current);
            } catch (err) {
              console.error(err);
            }
          };
          mute();
        }

        break;
      case "fullscreen":
        fullScreen();

        break;
      case "pause":
        const pause = async () => {
          try {
            player.current?.pauseVideo();
            // console.log(`callcount is: ${callCount.current}`);
            // callCount.current = callCount.current + 1;
            // console.log("callCount after incrementing: " + callCount.current);
          } catch (err) {
            console.error(err);
          }
        };
        pause();
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
        className="w-full "
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
