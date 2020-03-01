/// <reference types="dom-mediacapture-record" />
declare type ReturnedSig = {
    recorder: MediaRecorder | null;
    start: () => void;
    stop: () => void;
    isRecording: boolean;
};
export declare const useVoiceRecorder: (callbackFn: (result: Blob) => void) => ReturnedSig;
export {};
