import { useCallback, useEffect, useRef, useState } from "react";
import "./Webcam.css";
import Webcam from "react-webcam";
import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";
import Coordinates from "./Coordinates";
import { Coordinate } from "./WebcamTypes";

export default function WebcamWrapper() {
  const [poseData, setPoseData] = useState<Coordinate[][] | []>([]);

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const landmarkerRef = useRef(null);

  const videoConstraints = {
    width: 480,
    height: 270,
    facingMode: "user",
  };
  // laad het landmarker model in de landmarkerRef
  const capture = useCallback(async () => {
    if (
      webcamRef.current &&
      landmarkerRef.current &&
      webcamRef.current.getCanvas()
    ) {
      const video = webcamRef.current.video;
      if (video.currentTime > 0) {
        const result = await landmarkerRef.current.detectForVideo(
          video,
          performance.now()
        );
        if (result.landmarks) {
          setPoseData(result.landmarks);
        }
      }
    }
    requestAnimationFrame(capture);
  }, [webcamRef, landmarkerRef, setPoseData]);

  useEffect(() => {
    const createHandLandmarker = async () => {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
      );
      const handLandmarker = await HandLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
          delegate: "GPU",
        },
        runningMode: "VIDEO",
        numHands: 2,
      });

      landmarkerRef.current = handLandmarker;
      console.log("handlandmarker is created!");
      // start capturing - zie hieronder
      // capture()
    };
    createHandLandmarker();
    capture();
  }, [capture]);

  // capture de webcam stream en ontvang posedata
  // als de pose state is veranderd wordt deze code aangeroepen
  useEffect(() => {
    //...
  }, [poseData]);

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
      <Coordinates poseData={poseData} />
    </section>
  );
}
