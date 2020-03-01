/// <reference types="dom-mediacapture-record" />
declare type ReturnedSig = {
    recorder: MediaRecorder | null;
    start: () => Promise<void>;
    stop: () => void;
    isRecording: boolean;
};
export declare const useVoiceRecorder: (cb: (result: Blob) => void) => ReturnedSig;
export {};
