import { useEffect, useRef } from "react";
import { DrawingUtils, HandLandmarker } from "@mediapipe/tasks-vision";

import Webcam from "react-webcam";
import createHandLandmarker from "../utils/createHandLandmarker";

function WebcamLayout({ landmarkerRef, poseData, setPoseData }) {
  const drawingUtilsRef = useRef(null);

  const videoConstraints = {
    width: 480,
    height: 270,
    facingMode: "user",
  };

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    if (!drawingUtilsRef.current) {
      drawingUtilsRef.current = new DrawingUtils(ctx);
      // console.log("DrawingUtils created");
      // console.log(drawingUtilsRef.current);
    }
  }, []);

  useEffect(() => {
    const canvasContext = canvasRef.current.getContext("2d");
    if (drawingUtilsRef.current) {
      canvasContext.clearRect(0, 0, 480, 270);
      for (const hand of poseData) {
        drawingUtilsRef.current.drawConnectors(
          hand,
          HandLandmarker.HAND_CONNECTIONS,
          { color: "#00FF00", lineWidth: 3 }
        );
        drawingUtilsRef.current.drawLandmarks(hand, {
          radius: 2,
          color: "#FF0000",
          lineWidth: 2,
        });
      }
    }
  }, [poseData]);

  useEffect(() => {
    createHandLandmarker()
      .then((handLandMarker) => {
        if (!landmarkerRef.current) {
          landmarkerRef.current = handLandMarker;
          console.log("handlandmarker is created!");
        }
      })
      .then(() => {
        capture();
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const capture = async () => {
    if (
      webcamRef.current &&
      landmarkerRef.current &&
      webcamRef.current.getCanvas()
    ) {
      const video = webcamRef.current.video;
      if (video.currentTime > 0) {
        const result = await landmarkerRef.current.detectForVideo(
          webcamRef.current.video,
          performance.now()
        );
        if (result.landmarks) {
          setPoseData(result.landmarks);
        }
      }
    }
    requestAnimationFrame(capture);
  };
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
