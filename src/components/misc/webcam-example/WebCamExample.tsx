import {
  DrawingUtils,
  FilesetResolver,
  HandLandmarker,
  HandLandmarkerResult,
} from "@mediapipe/tasks-vision";
import { useEffect, useRef, useState, useCallback } from "react";
import { Coordinate } from "../../../utils/convertPosetoVector";

const WebCamExample = () => {
  const handLandmarkerRef = useRef<HandLandmarker | null>(null);
  const [runningMode, setRunningMode] = useState<"IMAGE" | "VIDEO">("IMAGE");
  const [webcamRunning, setWebcamRunning] = useState(false);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const enableWebcamButtonRef = useRef<HTMLButtonElement | null>(null);
  const drawingUtilsRef = useRef<DrawingUtils | null>(null);
  const [poseData, setPoseData] = useState<Coordinate[][] | []>([]);

  useEffect(() => {
    const createHandLandmarker = async () => {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
      );
      const handLandmarkerInstance = await HandLandmarker.createFromOptions(
        vision,
        {
          baseOptions: {
            modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
            delegate: "GPU",
          },
          runningMode: "IMAGE",
          numHands: 2,
        }
      );
      handLandmarkerRef.current = handLandmarkerInstance;
      // setHandLandmarker(handLandmarkerInstance);
    };
    createHandLandmarker();
  }, []);

  // Setup the canvas
  useEffect(() => {
    const canvasContext = canvasRef.current.getContext("2d");
    if (!drawingUtilsRef.current) {
      drawingUtilsRef.current = new DrawingUtils(canvasContext);
      // console.log("DrawingUtils created");
      // console.log(drawingUtilsRef.current);
    }

    //  resizeCanvasToDisplaySize(canvasRef.current);
  }, []);

  const handleClick = useCallback(
    async (event) => {
      if (!handLandmarkerRef.current) {
        console.log("Wait for handLandmarker to load before clicking!");
        return;
      }

      if (runningMode === "VIDEO") {
        setRunningMode("IMAGE");
        await handLandmarkerRef.current.setOptions({ runningMode: "IMAGE" });
      }

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
    },
    [handLandmarkerRef, runningMode, poseData]
  );
  const predictWebcam = useCallback(async () => {
    if (!webcamRunning) return;

    if (runningMode === "IMAGE") {
      setRunningMode("VIDEO");
      await handLandmarkerRef.current.setOptions({ runningMode: "VIDEO" });
    }

    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");

    canvasElement.style.width = `${videoRef.current.videoWidth}px`;
    canvasElement.style.height = `${videoRef.current.videoHeight}px`;
    canvasElement.width = videoRef.current.videoWidth;
    canvasElement.height = videoRef.current.videoHeight;

    let lastVideoTime = -1;
    let results: HandLandmarkerResult | undefined = undefined;

    const predict = async () => {
      if (!webcamRunning) return;

      const startTimeMs = performance.now();
      if (lastVideoTime !== videoRef.current.currentTime) {
        lastVideoTime = videoRef.current.currentTime;
        results = await handLandmarkerRef.current.detectForVideo(
          videoRef.current,
          startTimeMs
        );
      }

      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

      if (results.landmarks) {
        results.landmarks.forEach((landmarks) => {
          drawingUtilsRef.current.drawConnectors(
            // canvasCtx,
            landmarks,
            HandLandmarker.HAND_CONNECTIONS,
            {
              color: "#00FF00",
              lineWidth: 5,
            }
          );
          drawingUtilsRef.current.drawLandmarks(landmarks, {
            color: "#FF0000",
            lineWidth: 2,
          });
        });
      }

      canvasCtx.restore();
      requestAnimationFrame(predict);
    };

    predict();
  }, [runningMode, webcamRunning]);

  const enableCam = useCallback(() => {
    if (!handLandmarkerRef.current) {
      console.log("Wait! handLandmarker not loaded yet.");
      return;
    }

    if (webcamRunning) {
      setWebcamRunning(false);
      enableWebcamButtonRef.current.innerText = "ENABLE PREDICTIONS";
    } else {
      setWebcamRunning(true);
      enableWebcamButtonRef.current.innerText = "DISABLE PREDICTIONS";

      const constraints = { video: true };
      navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.addEventListener("loadeddata", predictWebcam);
      });
    }
  }, [handLandmarkerRef, webcamRunning, predictWebcam]);

  return (
    <div id="demos">
      {Array.from(images).map((img, index) => (
        <div key={index} className="detectOnClick">
          <img src={img.src} alt="Detect on Click" onClick={handleClick} />
        </div>
      ))}
      <button ref={enableWebcamButtonRef} onClick={enableCam}>
        ENABLE PREDICTIONS
      </button>
      <video ref={videoRef} id="webcam" style={{ display: "none" }}></video>
      <canvas ref={canvasRef} id="output_canvas"></canvas>
    </div>
  );
};

export default WebCamExample;
