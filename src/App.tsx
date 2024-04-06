function App() {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 instructions">
          <h2 className="text-2xl">Instructions</h2>
          <p> Open your hand = pausing </p>
          <p> Peacesign = fullscreen</p>
          <p> finger in front of the mouth = mute</p>
        </div>
        <div className="p-4 card">
          <h1 className="text-3xl font-bold underline">Video gestures</h1>
          <>
            <iframe
              src="https://www.youtube.com/embed/HcqpanDadyQ"
              title="What is Machine Learning?"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              className="w-full h-96"
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
