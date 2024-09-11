import {
  type DevicesInfo,
  type DisplaySurfaceType,
  type MimeType,
  type Output,
} from "./recorder.d";
import RecordRTC from "recordrtc";

export class MediaRecorderManager {
  private displaySurface: DisplaySurfaceType;
  public output?: Output;
  private independentAudioTracks?: boolean;
  private recordResultType: RecordRTC.Options["type"];
  private includeScreenAudio?: boolean;
  public stream?: MediaStream;
  public recordRTC: RecordRTC | undefined;
  private mimeType: MimeType;
  private recordURL?: string;
  private onStopRecording?: (manager: MediaRecorderManager) => void;

  constructor({
    mimeType,
    displaySurface,
    recordResultType,
    includeScreenAudio,
    independentAudioTracks,
    onStopRecording,
  }: {
    displaySurface: DisplaySurfaceType;
    recordResultType: RecordRTC.Options["type"];
    independentAudioTracks?: boolean;
    includeScreenAudio?: boolean;
    devicesInfo?: DevicesInfo;
    onStopRecording?: (manager: MediaRecorderManager) => void;
    mimeType?: MimeType;
  }) {
    this.displaySurface = displaySurface;
    this.recordResultType = recordResultType;
    this.mimeType = mimeType || "video/webm";
    this.includeScreenAudio = includeScreenAudio;
    this.independentAudioTracks = independentAudioTracks;
    this.onStopRecording = onStopRecording;
    RecordRTC.DiskStorage.init();
  }

  public addAudioTracks(additionalAudioTracks: MediaStreamTrack[]) {
    additionalAudioTracks.forEach((track) => {
      this.stream?.addTrack(track);
    });
  }
  public async startRecording(devicesInfo?: DevicesInfo) {
    let stream: MediaStream | undefined = undefined;
    switch (this.displaySurface) {
      case "camera":
        if (devicesInfo) {
          stream = await this.createCameraRecordingStream(devicesInfo);
        }
        break;
      default:
        stream = await this.createScreenRecordingStream();
        break;
    }
    if (stream) {
      const recordRTC = new RecordRTC(stream, {
        type: this.recordResultType,
        mimeType: this.mimeType,
      });

      this.stream = stream;
      this.recordRTC = recordRTC;
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const self = this;

      (
        stream.getVideoTracks()[0] || stream.getAudioTracks()[0]
      ).addEventListener("ended", () => {
        recordRTC.stopRecording(function () {
          const output = self.getFormattedRecord();
          self.output = output;
          self.onStopRecording?.(self);
          return output;
        });
      });
      recordRTC.startRecording();
    }
  }
  public resetRecording() {
    this.recordRTC?.reset();
  }
  public resumeRecording() {
    this.recordRTC?.startRecording();
  }

  public async stopRecording(): Promise<{
    video: File;
  }> {
    this.stream?.getTracks().forEach((track) => track.stop());
    return new Promise((resolve) => {
      this.recordRTC?.stopRecording(() => {
        const output = this.getFormattedRecord();
        this.output = output;
        RecordRTC.DiskStorage.Store({
          videoBlob: output.video,
        });
        resolve(output);
      });
    });
  }

  public getRecord() {
    return this.recordURL;
  }

  private getFormattedRecord() {
    const dateString = new Date(new Date().getTime() + 8 * 60 * 60 * 1000)
      .toISOString()
      .replace("T", "_")
      .replace(/\.\d+Z$/, "");
    const basicFilename = `www.cooltool.app录屏_${dateString}`;
    const blob = this.recordRTC?.getBlob()!;
    const video = new File([blob], `${basicFilename}.webm`, {
      type: "video/webm",
    });
    RecordRTC.DiskStorage.Store({
      videoBlob: video,
    });
    return {
      video,
    };
  }

  private generateFileFromMediaStreamTrack(
    mediaStreamTrack: MediaStreamTrack[],
    recordResultType: RecordRTC.Options["type"]
  ) {
    const mediaStream = new MediaStream();
    mediaStreamTrack.forEach((track) => {
      mediaStream.addTrack(track);
    });
    const recordRTC = new RecordRTC(mediaStream, { type: recordResultType });
    return recordRTC.getBlob();
  }

  private createScreenRecordingStream(): Promise<MediaStream> {
    return navigator.mediaDevices.getDisplayMedia({
      video: { displaySurface: this.displaySurface },
      audio: !!this.includeScreenAudio,
    });
  }

  private createCameraRecordingStream(
    devicesInfo: DevicesInfo
  ): Promise<MediaStream> {
    const { selectedAudioDeviceId, selectedVideoDeviceId } = devicesInfo || {};
    const constraints: MediaStreamConstraints = {
      audio: selectedAudioDeviceId
        ? { deviceId: { exact: selectedAudioDeviceId } }
        : false,
      video: selectedVideoDeviceId
        ? { deviceId: { exact: selectedVideoDeviceId } }
        : false,
    };

    return navigator.mediaDevices.getUserMedia(constraints);
  }
}
