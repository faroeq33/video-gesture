import { useEffect, useRef, useState } from "react";

function getTestData() {
  return JSON.parse(localStorage.getItem("testingData")).data; // on http://localhost:5173, If the old data was saved with a different port, it will not be able to retrieve the data
}

function App() {
  const [prediction, setPrediction] = useState("");
  // const [fullscreen, setFullscreen] = useState(false);

  const nn = useRef(null);

  const makePrediction = () => {
    const input = getTestData()[10].vector;

    nn.current.classify(input, (error, result: { label: never }[]) => {
      const bestPrediction = result[0].label;

      setPrediction(`I think this is ${bestPrediction}`);

      console.log(bestPrediction);

      if (error) console.error(error);
    });
  };

  useEffect(() => {
    // @ts-expect-error - Property 'neuralNetwork' does not exist on type 'Window & typeof globalThis'.
    console.log("ml5 version:", window.ml5.version);

    // @ts-expect-error - Property 'neuralNetwork' does not exist on type 'Window & typeof globalThis'.
    const network = window.ml5.neuralNetwork({
      task: "classification",
      debug: true,
    });

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

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 instructions">
          <h2 className="text-2xl">Instructions</h2>
          <p>Press play first before doing poses</p>
          <p> Open your hand = pausing </p>
          <p> Peacesign = fullscreen</p>
          <p> finger in front of the mouth = mute</p>
        </div>
        <div className="p-4 card">
          <h1 className="text-3xl font-bold underline">Video gestures</h1>
          <>
            <iframe
              className="w-full h-96"
              src="https://www.youtube.com/embed/UNw-3mOEN-0"
              title="How to read multi-tariff smart meter EMDI ES-10B"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen={true}
            />
          </>
        </div>

        <div className="p-4 prediction">
          <button className="p-4 bg-green-400" onClick={makePrediction}>
            Make Prediction
          </button>
          <p>
            The prediction is{" "}
            <span className="italic font-bold">{prediction}</span>{" "}
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
