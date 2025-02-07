import { useState } from "react";
import YouTube, { YouTubePlayer, YouTubeProps } from "react-youtube";
import ActionButton from "@/components/action-button";

export default function VideoPlayer(props: { classification: string }) {
  //   const [isReady, setIsReady] = useState(false);
  // console.log(YouTube.PlayerState);
  const [player, setPlayer] = useState<YouTubePlayer>(null);

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    setPlayer(event.target);
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

  const mute = () => {
    player.mute();
  };

  const fullScreen = () => {
    const iframe = player.getIframe();

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

  const pauseVideo = () => {
    player.pauseVideo();
  };

  function handlePoseEvent(classification: string) {
    switch (classification) {
      case "mute":
        // console.log("thing muted");
        mute();
        break;
      case "fullscreen":
        console.log(
          "not implemented yet, because of security reasons, see projects readme"
        );

        // fullScreen();
        break;
      case "pause":
        // fire pause event
        console.log("thing paused");
        pauseVideo();
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
        videoId="UNw-3mOEN-0"
        title="How to read multi-tariff smart meter EMDI ES-10B"
        opts={options}
        onReady={onPlayerReady}
      />{" "}
      <ActionButton onClick={mute}>mute</ActionButton>
      <ActionButton onClick={fullScreen}>fullscreen</ActionButton>
    </>
  );
}
