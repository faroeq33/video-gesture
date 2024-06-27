import { useCallback, useEffect, useRef } from "react";
import { DrawingUtils, HandLandmarker } from "@mediapipe/tasks-vision";

import Webcam from "react-webcam";
import createHandLandmarker from "../utils/createHandLandmarker";
import Canvas from "../components/Canvas";

function WebcamLayout({ poseData, setPoseData }) {
  const landmarkerRef = useRef<HandLandmarker | null>(null);
  const drawingUtilsRef = useRef(null);
  const animationFrameId = useRef(null); // for canceling the animation frame

  const videoConstraints = {
    width: 480,
    height: 270,
    // facingMode: "user",
  };

  const canvasRef = useRef(null);
  const webcamRef = useRef(null);

  // Setup the canvas
  useEffect(() => {
    const canvasContext = canvasRef.current.getContext("2d");
    if (!drawingUtilsRef.current) {
      drawingUtilsRef.current = new DrawingUtils(canvasContext);
      // console.log("DrawingUtils created");
      // console.log(drawingUtilsRef.current);
    }

    resizeCanvasToDisplaySize(canvasRef.current);
  }, []);

  // Logic for drawing
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
    animationFrameId.current = window.requestAnimationFrame(capture);
  }, [webcamRef, landmarkerRef, setPoseData]);

  useEffect(() => {
    createHandLandmarker()
      .then((handLandMarker) => {
        // ensures that the handLandmarker is only created once
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
    return () => {
      cancelAnimationFrame(animationFrameId.current);
    };
  }, [landmarkerRef, capture]);

  function resizeCanvasToDisplaySize(canvas) {
    const { width, height } = canvas.getBoundingClientRect();

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      return true; // here you can return some usefull information like delta width and delta height instead of just true
      // this information can be used in the next redraw...
    }

    return false;
  }

  return (
    <>
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
        <Canvas ref={canvasRef} {...videoConstraints}></Canvas>
      </section>
    </>
  );
}

export default WebcamLayout;
