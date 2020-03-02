React hook for recording users' audio. 

This project is using MediaRecorder as its underhood.

# How to use
__See full example in [/example](https://github.com/MrFranke/use-voice-recorder/tree/master/example) folder__

First you need to call hook with a callback function.
This callback gets Blob with a recorded audio after recording was stopped.

Hook provide 3 methods:
- isRecording – status of recording user media
- start – call when you want to start recording
- stop – call when you want to stop recording
 
```typescript jsx
const Recorder: React.FC<{
  onRecorded: (data: Blob) => void
}> = ({onRecorded}) => {
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
```

Audio is stored as Blob format, so if you want to play a record you may create link with 
`window.URL.createObjectURL(blobAudio)`.

```typescript jsx
const Player: React.FC<{
  audioBlob: Blob
}> = ({audioBlob}) => {
  const link = window.URL.createObjectURL(audioBlob)
  return <audio src={link} controls />
};
```

Full example:
```typescript jsx
import * as React from "react";
import { useState } from "react";
import { useVoiceRecorder } from "use-voice-recorder";

type Props = {
  onRecorded: (data: Blob) => void
}

const Recorder: React.FC<Props> = ({onRecorded}) => {
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

const App: React.FC = () => {
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

```

# ATTENTION
This hook is using MediaRecorder API, so you need to check the browser compatibility before useing it:
https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Recording_API

Also, there are different browsers that provide different codecs and audio formats. Be careful about this.
You can check supported codecs with this method [MediaRecorder.isTypeSupported](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/isTypeSupported)

If you want to polyfill MediaRecorder, you can use [Evil Martians Solution](https://github.com/ai/audio-recorder-polyfill). 


