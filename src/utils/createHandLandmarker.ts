import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";

const createHandLandmarker = async () => {
  try {
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
    );
    const handLandmarker = await HandLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
        delegate: "GPU",
      },
      minHandDetectionConfidence: 0.8,
      runningMode: "VIDEO",
      numHands: 1,
    });
    return handLandmarker;
  } catch (error) {
    console.log("error", error);
  }
};

export default createHandLandmarker;
