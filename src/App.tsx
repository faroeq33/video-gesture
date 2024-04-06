function App() {
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
      </div>
    </>
  );
}

export default App;
