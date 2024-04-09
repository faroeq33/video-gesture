import { useEffect, useRef, useState } from "react";

export function usePrediction(input) {
  const [prediction, setPrediction] = useState("");

  // @ts-expect-error - Property 'neuralNetwork' does not exist on type 'Window & typeof globalThis'.
  const network = window.ml5.neuralNetwork({
    task: "classification",
    debug: true,
  });

  const nn = useRef(network);

  const makePrediction = () => {
    nn.current.classify(input, (error, result: { label: never }[]) => {
      const bestPrediction = result[0].label;

      setPrediction(`${bestPrediction}`);

      console.log(bestPrediction);

      if (error) console.error(error);
    });
  };

  useEffect(() => {
    // @ts-expect-error - Property 'neuralNetwork' does not exist on type 'Window & typeof globalThis'.
    console.log("ml5 version:", window.ml5.version);

    const network = nn.current;

    const modelDetails = {
      model: "model/model.json",
      metadata: "model/model_meta.json",
      weights: "model/model.weights.bin",
    };

    network.load(modelDetails, () => {
      console.log("model loaded");
      nn.current = network;
    });
  }, []);
  return {
    prediction,
    makePrediction,
  };
}
