import * as ReactDOM from "react-dom";
import * as React from "react";
import { useEffect, useState } from "react";
import { useVoiceRecorder } from "use-voice-recorder";

export const App: React.FC = () => {
  const [records, updateRecords] = useState([]);
  const { isRecording, stop, start, recorder } = useVoiceRecorder((data) => {
    updateRecords([...records, window.URL.createObjectURL(data)]);
  });

  return (
    <div className={"container"}>
      <div className={"hint"}>Just hold the mic button and speak.</div>
      <div className={"records"}>
        <h1>Records:</h1>
        {records.map((data, idx) => (
          <div key={idx}>
            <audio src={data} controls preload={"metadata"} />
          </div>
        ))}
      </div>
      <div>
        <button
          className={`btn ${isRecording ? "active" : ""}`}
          onMouseDown={start}
          onMouseUp={stop}
          onTouchStart={start}
          onTouchEnd={stop}
        >
          🎙
        </button>

        <h3 className={"onair"}>On air: {isRecording ? "on" : "off"}</h3>
      </div>
    </div>
  );
};

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<App />, document.querySelector("#app"));
});
