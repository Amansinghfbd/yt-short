import React from "react";
import VideoPlayer from "./VideoPlayer";
import videoData from "./videoData.json";
import "./App.css";

function App() {
  return (
    <div className="App">
      {videoData.map((video) => (
        <VideoPlayer key={video.id} videoData={video} />
      ))}
    </div>
  );
}

export default App;
