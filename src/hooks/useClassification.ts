import { useRef, useState } from "react";
import { Coordinate, convertPoseToVector } from "../utils/convertPosetoVector";
import { ClassificationOptions, predictionResult } from "../types";

export function useClassification(
  input: Coordinate[][] | [],
  options: ClassificationOptions = {
    tolerance: 0.8,
    initClassification: "",
    startClassifying: false,
  }
) {
  const [classification, setClassification] = useState(
    options.initClassification ?? ""
  ); // Does this classification need to be state?
  const [isClassifying, setIsClassifying] = useState(
    options.startClassifying ?? false
  );
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

  queryCount.current += 1;
  neuralNetworkRef.current.load(modelDetails, onModelLoaded);

  function onModelLoaded() {
    if (isClassifying === false) {
      return;
    }
    // console.log("input length", input.length);

    // I don't want to classify if there is no input
    /*if (input.length <= 0) {
      // setClassification("");
      return;
    }*/
    setIsClassifying(true);
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
        }
      }
    );
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps

  return {
    isClassifying,
    predictionCount: queryCount.current,
    toggle: () => {
      setIsClassifying(!isClassifying);
    },
    classification,
  };
}
