var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        default:
            return state;
    }
};
export const useVoiceRecorder = (cb) => {
    const [state, dispatch] = useReducer(reducer, initState);
    const finishRecording = ({ data }) => { cb(data); };
    const start = () => __awaiter(void 0, void 0, void 0, function* () {
        dispatch({ type: 'start' });
        const stream = yield navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        dispatch({ type: 'startRecording', payload: { recorder } });
        recorder.start();
        recorder.addEventListener('dataavailable', finishRecording);
    });
    const stop = () => {
        const recorder = state.recorder;
        dispatch({ type: 'stop' });
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
//# sourceMappingURL=index.js.map