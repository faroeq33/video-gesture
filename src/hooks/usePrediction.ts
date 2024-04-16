import { useEffect, useRef, useState } from "react";
import { Coordinate, convertPoseToVector } from "../utils/convertPosetoVector";

export function useClassification(
  input: Coordinate[][] | [],
  options: { tolerance: number }
) {
  const [result, setClassification] = useState("");
  const [isClassifying, setIsClassifying] = useState(true);

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
      if (isClassifying === false) {
        return;
      }
      // console.log("input length", input.length);

      // I don't want to classify if there is no input
      if (input.length <= 0) {
        setClassification("");
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
            setClassification(result[0].label);
          } else {
            setClassification("");
          }
        }
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [convertedPose]);

  return {
    isClassifying,
    predictionCount: queryCount.current,
    toggle: () => {
      if (input.length <= 0) {
        return;
      }
      setIsClassifying(!isClassifying);
      // if (neuralNetworkRef.current.isPredicting) {
      //   neuralNetworkRef.current.stopPredicting();
      // } else {
      //   neuralNetworkRef.current.predict(convertedPose);
      // }
    },
    result,
  };
}

type predictionResult = {
  fullscreen: number;
  label: string;
  confidence: number;
};
