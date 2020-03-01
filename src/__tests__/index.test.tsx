import { renderHook, act } from '@testing-library/react-hooks'
import { useVoiceRecorder } from "../index";

jest.useFakeTimers();

describe("Voice recorder", () => {
  it('Hook is not crushing', () => {
    renderHook(() => useVoiceRecorder(() => {}));
  });

  it('Hook can start record', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useVoiceRecorder(() => {}));

    await act(async () => {
      result.current.start();
      await waitForNextUpdate();
    });

    expect(result.current.isRecording).toBe(true);
  });

  it('Hook can stop record', async () => {
    const { result } = renderHook(() => useVoiceRecorder(() => {}));

    await act(async () => {
      result.current.stop();
    });

    expect(result.current.isRecording).toBe(false);

  });

  it('Hook set correct status when recording', async () => {
    const { result } = renderHook(() => useVoiceRecorder(() => {}));
    await act(async () => {
      result.current.start();
    });
    expect(result.current.isRecording).toBe(true);
  });

  it('Hook set correct status when stop recording', async () => {
    const { result } = renderHook(() => useVoiceRecorder(() => {}));

    act(() => {
      result.current.stop();
    });
    expect(result.current.isRecording).toBe(false);
  });

  // it('Callback is work', async () => {
  //   const cb = jest.fn();
  //   const { result, waitForNextUpdate } = renderHook(() => useVoiceRecorder(cb));
  //
  //   await act(async () => {
  //     result.current.start();
  //     await waitForNextUpdate();
  //     result.current.stop();
  //     await waitForNextUpdate();
  //     jest.runAllTimers();
  //   });
  //   expect(cb).toBeCalled();
  // })
});
