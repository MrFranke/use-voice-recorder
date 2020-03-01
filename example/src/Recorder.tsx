import * as React from "react";
import { useVoiceRecorder } from "use-voice-recorder";

type Props = {
  onRecorded: (data: Blob) => void
}

export const Recorder: React.FC<Props> = ({onRecorded}) => {
  const {isRecording, stop, start} = useVoiceRecorder(onRecorded);
  return (
    <div>
      <div>
        On air: {isRecording ? 'on' : 'off'}
      </div>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </div>
  )
};
