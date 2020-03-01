const mockMediaDevices = {
  getUserMedia: (config: {audio: boolean, video: boolean}): Promise<MediaStream> =>
    Promise.resolve({} as MediaStream)
};

// @ts-ignore
global.navigator.mediaDevices = mockMediaDevices;
// @ts-ignore
global.MediaRecorder = class {
  private _handler?: (data: Blob) => void;
  constructor() {}
  start() {}
  stop() {
    this._handler && this._handler(new Blob());
  }
  addEventListener(name: string, handler: (args?: any) => void) {
    this._handler = handler;
  }
  removeEventListener(name: string, handler: (args?: any) => {}) {
    this._handler = undefined;
  }
};

