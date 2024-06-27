import { useEffect, useRef, useState } from "react";
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
    options.startClassifying || false
  );

  const nn = useRef(null);

  useEffect(() => {
    // @ts-expect-error - Property 'ml5' does not exist on type 'Window & typeof globalThis'.
    const ml5 = window.ml5;
    ml5.setBackend("webgl"); // Required for running on the browser

    nn.current = ml5.neuralNetwork({
      task: "classification",
      debug: true,
    });
  }, []);

  useEffect(() => {
    let convertedPose = [];
    convertedPose = convertPoseToVector(input);

    // const network = ml5.neuralNetwork({
    //   task: "classification",
    //   debug: true,
    // });

    const modelDetails = {
      model: "model/model.json",
      metadata: "model/model_meta.json",
      weights: "model/model.weights.bin",
    };

    nn.current.load(modelDetails, onModelLoaded);

    function onModelLoaded() {
      if (isClassifying === false) {
        return;
      }

      if (convertedPose.length <= 0) {
        return;
      }
      try {
        setIsClassifying(true);

        nn.current.classify(convertedPose, (result: predictionResult) => {
          // console.log("result", result[0].label);
          // console.log("prediction object", result);

          if (result[0].confidence > options.tolerance) {
            setClassification(result[0].label);
          }
        });
      } catch (error) {
        console.log("error", error);
      }
    }
  }, [input, isClassifying, options.tolerance]);

  return {
    isClassifying,
    toggle: () => {
      setIsClassifying(!isClassifying);
    },
    classification,
  };
}
