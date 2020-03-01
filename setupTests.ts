const mockMediaDevices = {
  getUserMedia: (config: {audio: boolean, video: boolean}): Promise<MediaStream> =>
    Promise.resolve({} as MediaStream)
};

// @ts-ignore
global.navigator.mediaDevices = mockMediaDevices;
// @ts-ignore
global.MediaRecorder = class {
  constructor() {}
  start() {}
  stop() {}
  addEventListener(name: string, handler: (args?: any) => {}) {
    setTimeout(() => handler(new Blob()), 500);
  }
  removeEventListener(name: string, handler: (args?: any) => {}) {}
};

