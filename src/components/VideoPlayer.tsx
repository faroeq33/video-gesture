// import { useState } from "react";
import { useState } from "react";
import YouTube, { YouTubePlayer, YouTubeProps } from "react-youtube";

function VideoPlayer() {
  //   const [isReady, setIsReady] = useState(false);
  // console.log(YouTube.PlayerState);
  const [player, setPlayer] = useState<YouTubePlayer>(null);

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    event.target.pauseVideo();
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

  return (
    <>
      <YouTube
        className="w-full h-96"
        videoId="UNw-3mOEN-0"
        title="How to read multi-tariff smart meter EMDI ES-10B"
        opts={options}
        onReady={onPlayerReady}
      />{" "}
      {/* <MyButton onClick={mute}>mute</MyButton>
      <MyButton onClick={fullScreen}>fullscreen</MyButton> */}
    </>
  );
}
export default VideoPlayer;
