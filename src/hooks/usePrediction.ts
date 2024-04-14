import { useEffect, useRef, useState } from "react";
import { Coordinate, convertPoseToVector } from "../utils/convertPosetoVector";

export function usePrediction(input: Coordinate[][] | []) {
  const [prediction, setPrediction] = useState("");
  const [modelLoaded, setModelLoaded] = useState(false);

  // console.log("input", input);
  let convertedPose = [];

  convertedPose = convertPoseToVector(input);

  // @ts-expect-error - Property 'neuralNetwork' does not exist on type 'Window & typeof globalThis'.
  const nn = window.ml5.neuralNetwork({
    task: "classification",
    debug: true,
  });

  const neuralNetworkRef = useRef(nn);
  const queryCount = useRef(0);

  useEffect(() => {
    queryCount.current += 1;
    // if (!modelLoaded) {
    const modelDetails = {
      model: "model/model.json",
      metadata: "model/model_meta.json",
      weights: "model/model.weights.bin",
    };

    neuralNetworkRef.current.load(modelDetails, onModelLoaded);
    setModelLoaded(true);
    // }

    function onModelLoaded() {
      // console.log("input length", input.length);
      if (input.length > 0) {
        neuralNetworkRef.current.classify(convertedPose, (error, result) => {
          // console.log("result", result[0].label);
          setPrediction(result[0].label);
        });
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [convertedPose]);

  return {
    predictionCount: queryCount.current,
    prediction,
  };
}
