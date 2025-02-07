import { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import {
  DrawingUtils,
  FilesetResolver,
  HandLandmarker,
} from "@mediapipe/tasks-vision";
import { PoseCollectionStream } from "../types";

export default function WebcamWrapper() {
  const [poseData, setPoseData] = useState<PoseCollectionStream | []>([]);

  const webcamRef = useRef<Webcam | null>(null); // The type for webcamRef may be wrong
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const landmarkerRef = useRef<HandLandmarker | null>(null);

  const drawingUtilsRef = useRef<DrawingUtils | null>(null); // The type for DrawingUtils may be wrong

  const videoConstraints = {
    width: 480,
    height: 270,
    // facingMode: "user",
  };

  // capture de webcam stream en ontvang posedata
  const capture = useCallback(async () => {
    // Check if the webcamRef, landmarkerRef, and webcamRef.video are available and if the current video time is greater than 0
    if (
      !webcamRef.current ||
      !landmarkerRef.current ||
      !webcamRef.current.video ||
      webcamRef.current.video.currentTime <= 0
    ) {
      requestAnimationFrame(capture);
      return;
    }

    const result = await landmarkerRef.current.detectForVideo(
      webcamRef.current.video,
      performance.now()
    );

    if (result.landmarks) {
      setPoseData(result.landmarks);
    }

    requestAnimationFrame(capture);
  }, [webcamRef, landmarkerRef, setPoseData]);

  // Laad het landmarker model in de landmarkerRef
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
      capture();
    };
    createHandLandmarker();
    // capture();
  }, [capture]);

  // Laad de canvas context in de drawingUtilsRef
  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    drawingUtilsRef.current = new DrawingUtils(ctx);
  }, []);

  // als de pose state is veranderd wordt deze code aangeroepen
  useEffect(() => {
    //...
    const ctx = canvasRef.current.getContext("2d");
    if (drawingUtilsRef.current) {
      ctx.clearRect(0, 0, videoConstraints.width, videoConstraints.height);
      for (const hand of poseData) {
        drawingUtilsRef.current.drawConnectors(
          hand,
          HandLandmarker.HAND_CONNECTIONS,
          { color: "#00FF00", lineWidth: 2 }
        );
        drawingUtilsRef.current.drawLandmarks(hand, {
          radius: 2,
          color: "#FF0000",
          lineWidth: 2,
        });
      }
    }
  }, [poseData, videoConstraints.width, videoConstraints.height]);

  return (
    <section className="videosection">
      <Webcam
        {...videoConstraints} // otherwhise the video will be of the wrong size
        mirrored={true}
        id="webcam"
        audio={false}
        videoConstraints={videoConstraints}
        ref={webcamRef}
      />
      <canvas ref={canvasRef} {...videoConstraints}></canvas>
      {/* <Coordinates poseData={poseData} /> */}
    </section>
  );
}
