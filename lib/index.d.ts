/// <reference types="dom-mediacapture-record" />
export declare const useRecorder: (cb: (result: Blob) => void) => {
    start: () => Promise<void>;
    stop: () => void;
    recorder: MediaRecorder;
    isRecording: boolean;
    error: Error;
};
