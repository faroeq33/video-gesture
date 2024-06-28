import { useRef } from "react";
import "./Webcam.css";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 480,
  height: 270,
  facingMode: "user",
};

export default function WebcamWrapper() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  return (
    <section className="videosection">
      <Webcam
        width={videoConstraints.width}
        height={videoConstraints.height}
        mirrored={true}
        id="webcam"
        audio={false}
        videoConstraints={videoConstraints}
        ref={webcamRef}
      />
      <canvas ref={canvasRef} {...videoConstraints}></canvas>
    </section>
  );
}
