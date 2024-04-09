import { useEffect, useRef, useState } from "react";

export function usePrediction(input) {
  const [prediction, setPrediction] = useState("");

  // @ts-expect-error - Property 'neuralNetwork' does not exist on type 'Window & typeof globalThis'.
  const network = window.ml5.neuralNetwork({
    task: "classification",
    debug: true,
  });

  const neuralNetworkRef = useRef(network);
  const queryCount = useRef(0);

  const makePrediction = () => {
    neuralNetworkRef.current.classify(
      input,
      (error, result: { label: never }[]) => {
        const bestPrediction = result[0].label;

        // neuralNetworkRef.current.prediction = bestPrediction;
        setPrediction(bestPrediction);

        if (error) console.error(error);
      }
    );
  };

  useEffect(() => {
    queryCount.current += 1;
    onPrediction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prediction, network]);

  function onPrediction() {
    const modelDetails = {
      model: "model/model.json",
      metadata: "model/model_meta.json",
      weights: "model/model.weights.bin",
    };

    network.load(modelDetails, () => {
      console.log("model loaded");
      neuralNetworkRef.current = network;
    });
  }

  return {
    predictionCount: queryCount.current,
    prediction,
    makePrediction,
  };
}
