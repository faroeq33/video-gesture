import { useEffect, useRef, useState } from "react";
import convertPoseToVector from "@/utils/convert-pose-to-vector";
import { PoseCollectionStream } from "@/types";
import { ClassificationOptions, predictionResult } from "@/types";

export default function useClassification(
  input: PoseCollectionStream | [],
  options: ClassificationOptions = {
    tolerance: 0.8,
    startClassifying: false,
  }
) {
  const NOPOSESDETECTED = "";
  const [classification, setClassification] = useState(NOPOSESDETECTED);

  const [isClassifying, setIsClassifying] = useState(options.startClassifying);

  const nn = useRef(null);

  useEffect(() => {
    // @ts-expect-error - Property 'ml5' does not exist on type 'Window & typeof globalThis'.
    ml5.setBackend("webgl"); // Required for running on the browser

    // @ts-expect-error - Property 'ml5' does not exist on type 'Window & typeof globalThis'.
    nn.current = ml5.neuralNetwork({
      task: "classification",
      debug: process.env.NODE_ENV === "production" ? false : true,
    });
  }, []);

  useEffect(() => {
    const convertedPose = convertPoseToVector(input);

    const modelDetails = {
      model: "model/model.json",
      metadata: "model/model_meta.json",
      weights: "model/model.weights.bin",
    };

    let isActive = true;

    nn.current.load(modelDetails, onModelLoaded);

    function onModelLoaded() {
      if (isClassifying === false) {
        return;
      }

      if (convertedPose.length <= 0) {
        // By setting classification to an empty string, it prevens spamming comands to the youtube api
        setClassification(NOPOSESDETECTED);
        return;
      }
      try {
        setIsClassifying(true);

        nn.current.classify(convertedPose, (result: predictionResult) => {
          // if (!isActive) return;

          if (result[0].confidence > options.tolerance) {
            setClassification(result[0].label);
          }
        });
      } catch (error) {
        return console.log("error", error);
      }
    }

    return () => {
      isActive = false;
    };
  }, [input, isClassifying, options.tolerance]);

  return {
    isClassifying,
    classification,
    toggle: () => {
      // When isClassifying is true it sets to false & vice versa
      setIsClassifying(!isClassifying);
      console.log("toggled classification");

      setClassification("");
    },
  };
}
