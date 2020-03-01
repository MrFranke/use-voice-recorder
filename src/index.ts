import { useReducer } from 'react';

type ReturnedSig = {
  recorder: MediaRecorder | null;
  start: () => Promise<void>;
  stop: () => void;
  isRecording: boolean;
};

type State = {
  isRecording: boolean,
  recorder: MediaRecorder | null,
  data: Blob | null
}

type Actions =
  | {type: 'start'}
  | {type: 'startRecording', payload: {recorder: MediaRecorder}}
  | {type: 'stop'};

const initState: State = {
  isRecording: false,
  recorder: null,
  data: null
};

const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case 'start':
      return {...state, isRecording: true};
    case 'stop':
      return {...state, isRecording: false};
    case 'startRecording':
      return {...state, isRecording: true, recorder: action.payload.recorder};
    default:
      return state;
  }
};

export const useVoiceRecorder = (cb: (result: Blob) => void): ReturnedSig => {
  const [state, dispatch] = useReducer(reducer, initState);

  const finishRecording = ({data}: {data: Blob}) => { cb(data); };

  const start = async () => {
    dispatch({type: 'start'});
    const stream = await navigator.mediaDevices.getUserMedia({audio: true});
    const recorder = new MediaRecorder(stream);
    dispatch({type: 'startRecording', payload: {recorder}});
    recorder.start();
    recorder.addEventListener('dataavailable', finishRecording);
  };

  const stop = () => {
    const recorder = state.recorder;
    dispatch({type: 'stop'});
    if (recorder) {
      recorder.stop();
      recorder.removeEventListener('dataavailable', finishRecording);
    }
  };

  return {
    start,
    stop,
    recorder: state.recorder,
    isRecording: state.isRecording,
  };
};
