import { useEffect, useRef, useState } from "react";
import { Coordinate, convertPoseToVector } from "../utils/convertPosetoVector";

export function usePrediction(
  input: Coordinate[][] | [],
  options: { tolerance: number }
) {
  const [result, setPrediction] = useState("");

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

  const modelDetails = {
    model: "model/model.json",
    metadata: "model/model_meta.json",
    weights: "model/model.weights.bin",
  };

  useEffect(() => {
    queryCount.current += 1;
    neuralNetworkRef.current.load(modelDetails, onModelLoaded);

    function onModelLoaded() {
      // console.log("input length", input.length);

      // I don't want to classify if there is no input
      if (input.length <= 0) {
        setPrediction("");
        return;
      }
      neuralNetworkRef.current.classify(
        convertedPose,
        (error, result: predictionResult) => {
          if (error) {
            console.log("error", error);
          }
          // console.log("result", result[0].label);
          // console.log("prediction object", result);

          if (result[0].confidence > options.tolerance) {
            setPrediction(result[0].label);
          } else {
            setPrediction("");
          }
        }
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [convertedPose]);

  return {
    isPredicting: input.length > 0,
    predictionCount: queryCount.current,
    result,
  };
}

type predictionResult = {
  fullscreen: number;
  label: string;
  confidence: number;
};
