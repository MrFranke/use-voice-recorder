import { useReducer } from 'react';
const initState = {
    isRecording: false,
    recorder: null,
    data: null
};
const reducer = (state, action) => {
    switch (action.type) {
        case 'start':
            return Object.assign(Object.assign({}, state), { isRecording: true });
        case 'stop':
            return Object.assign(Object.assign({}, state), { isRecording: false });
        case 'startRecording':
            return Object.assign(Object.assign({}, state), { isRecording: true, recorder: action.payload.recorder });
        case 'dataReceived':
            return Object.assign(Object.assign({}, state), { isRecording: false, data: action.payload.data });
        default:
            return state;
    }
};
export const useVoiceRecorder = (callbackFn) => {
    const [state, dispatch] = useReducer(reducer, initState);
    const finishRecording = ({ data }) => {
        dispatch({ type: 'dataReceived', payload: { data } });
        callbackFn(state.data);
    };
    const start = () => {
        dispatch({ type: 'start' });
        navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
            const recorder = new MediaRecorder(stream);
            dispatch({ type: 'startRecording', payload: { recorder } });
            recorder.start();
            recorder.addEventListener('dataavailable', finishRecording);
        });
    };
    const stop = () => {
        const recorder = state.recorder;
        dispatch({ type: 'stop' });
        if (recorder) {
            state.recorder.stop();
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
//# sourceMappingURL=index.js.map