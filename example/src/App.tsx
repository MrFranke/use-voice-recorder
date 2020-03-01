import * as React from "react";
import { Recorder } from "./Recorder";
import { useState } from "react";

export const App: React.FC = () => {
  const [records, setRecords] = useState([]);
  return (
    <div>
      <h1>Voice recorder</h1>
      <Recorder onRecorded={(data) => setRecords([...records, window.URL.createObjectURL(data)])} />
      
      <div>
        <h1>Records:</h1>
        {records.map((data, idx) => (
          <div key={idx}>
            <audio src={data} controls preload={'metadata'} />
          </div>
        ))}
      </div>
    </div>
  )
};
