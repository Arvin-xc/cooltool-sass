export const getAudioTracksByDeviceId = async (audioDeviceID?: string) => {
  const additionalAudioTracks: MediaStreamTrack[] = [];

  if (audioDeviceID) {
    const constraints: MediaStreamConstraints = {
      audio: {
        deviceId: { exact: audioDeviceID },
        autoGainControl: true, // 或者尝试 false 来测试差异
        noiseSuppression: true, // 可以启用降噪功能
        echoCancellation: true, // 回声消除
      },
    };
    const audioSteam = await navigator.mediaDevices.getUserMedia(constraints);
    additionalAudioTracks.push(...audioSteam.getAudioTracks());
  }
  return additionalAudioTracks;
};
