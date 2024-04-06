import { useRef } from "react";
import Webcam from "react-webcam";

function WebcamLayout() {
  const videoConstraints = {
    width: 480,
    height: 270,
    facingMode: "user",
  };
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  return (
    <>
      <section className="videosection">
        <Webcam
          width={480}
          height={270}
          mirrored={true}
          id="webcam"
          audio={false}
          videoConstraints={videoConstraints}
          ref={webcamRef}
        />
        <canvas ref={canvasRef} width={480} height={270}></canvas>
      </section>
    </>
  );
}

export default WebcamLayout;
