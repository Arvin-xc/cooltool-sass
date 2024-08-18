import { defineStore } from "pinia";

export const settings = [
  {
    title: "编码格式",
    key: "encode",
    options: [
      { label: "不重新编码 (从输入文件复制视频)", value: "-c:v copy" },
      { label: "AV1 (AOMedia Video 1)", value: "-c:v libaom-av1" },
      { label: "H.261", value: "-c:v h261" },
      { label: "H.263", value: "-c:v h263" },
      { label: "H.263+", value: "-c:v h263p" },
      { label: "H.264 (AVC)", value: "-c:v libx264" },
      { label: "H.265 (HEVC)", value: "-c:v libx265" },
      { label: "MPEG-1", value: "-c:v mpeg1video" },
      { label: "MPEG-2", value: "-c:v mpeg2video" },
      { label: "MPEG-4", value: "-c:v mpeg4" },
      { label: "Microsoft MPEG-4", value: "-c:v msmpeg4v3" },
      { label: "VP8", value: "-c:v libvpx" },
      { label: "VP9", value: "-c:v libvpx-vp9" },
      { label: "THEORA", value: "-c:v libtheora" },
      { label: "XVID", value: "-c:v libxvid" },
      { label: "DIVX", value: "-c:v mpeg4" }, // DivX 基于 MPEG-4
      { label: "MJPEG", value: "-c:v mjpeg" },
      { label: "HuffYUV", value: "-c:v huffyuv" },
      { label: "Flash Screen Video", value: "-c:v flashsv" },
      { label: "FLV (Flash Video, Sorenson H.263)", value: "-c:v flv" },
      { label: "Windows Media Video 7 (WMV1)", value: "-c:v wmv1" },
      { label: "Windows Media Video 8 (WMV2)", value: "-c:v wmv2" },
    ],
  },
  // {
  //   title: "视频画质",
  //   key: "level",
  //   options: [
  //     {
  //       label: "5",
  //       value: "",
  //     },
  //     {
  //       label: "10",
  //       value: "",
  //     },
  //     {
  //       label: "15",
  //       value: "",
  //     },
  //     {
  //       label: "20",
  //       value: "",
  //     },
  //     {
  //       label: "25",
  //       value: "",
  //     },
  //     {
  //       label: "27",
  //       value: "",
  //     },
  //     {
  //       label: "30",
  //       value: "",
  //     },
  //     {
  //       label: "35",
  //       value: "",
  //     },
  //     {
  //       label: "37",
  //       value: "",
  //     },
  //     {
  //       label: "39",
  //       value: "",
  //     },
  //     {
  //       label: "40",
  //       value: "",
  //     },
  //     {
  //       label: "45",
  //       value: "",
  //     },
  //     {
  //       label: "50",
  //       value: "",
  //     },
  //     {
  //       label: "55",
  //       value: "",
  //     },
  //     {
  //       label: "60",
  //       value: "",
  //     },
  //   ],
  // },
  {
    title: "视频尺寸",
    key: "size",
    options: [
      { label: "无更改", value: "copy" }, // 不更改分辨率
      { label: "176x144 (QCIF)", value: "-s 176x144" },
      { label: "256x144 (YouTube 144p)", value: "-s 256x144" },
      { label: "320x240 (4:3 240p)", value: "-s 320x240" },
      { label: "426x240 (YouTube 240p)", value: "-s 426x240" },
      { label: "640x360 (YouTube 360p)", value: "-s 640x360" },
      { label: "640x480 (4:3 480p)", value: "-s 640x480" },
      { label: "720x480 (NTSC)", value: "-s 720x480" },
      { label: "854x480 (YouTube 480p)", value: "-s 854x480" },
      { label: "720x576 (PAL)", value: "-s 720x576" },
      { label: "1280x720 (720p HD)", value: "-s 1280x720" },
      { label: "1920x1080 (1080p Full HD)", value: "-s 1920x1080" },
      { label: "2560x1440 (1440p 2K WQHD)", value: "-s 2560x1440" },
      { label: "3840x2160 (2160p 4K UHD)", value: "-s 3840x2160" },
      // { label: "自定义", value: "" },
    ],
  },
  // {
  //   title: "帧率",
  //   key: "frameRate",
  //   options: [
  //     {
  //       label: "5FPS",
  //       value: "",
  //     },
  //     {
  //       label: "10FPS",
  //       value: "",
  //     },
  //     {
  //       label: "15FPS",
  //       value: "",
  //     },
  //     {
  //       label: "20FPS",
  //       value: "",
  //     },
  //     {
  //       label: "25FPS",
  //       value: "",
  //     },
  //     {
  //       label: "30FPS",
  //       value: "",
  //     },
  //     {
  //       label: "50FPS",
  //       value: "",
  //     },
  //     {
  //       label: "60FPS",
  //       value: "",
  //     },
  //     {
  //       label: "无更改",
  //       value: "",
  //     },
  //   ],
  // },
  {
    title: "旋转",
    key: "rotate",
    options: [
      {
        label: "顺时针旋转90度",
        value: "transpose=1",
      },
      {
        label: "旋转180度",
        value: "rotate=PI",
      },
      {
        label: "逆时针旋转90度",
        value: "transpose=2",
      },
    ],
  },
  {
    title: "翻转",
    key: "vf",
    options: [
      {
        label: "垂直镜像翻转",
        value: "vflip", // 垂直翻转
      },
      {
        label: "水平镜像翻转",
        value: "hflip", // 水平翻转
      },
    ],
  },
] as const;



export type ConvertOptionKey = (typeof settings)[number]["key"];
export type VideoConverterOptions = Record<ConvertOptionKey, string>;

export const useConverterSettingStore = defineStore("converterSettingStore", {
  state: () => {
    return {
      open: false,
      defaultSettings: {
        encode: settings[0].options[0].value as string,
        // level: "2",
        size: settings[1].options[0].value as string,
        // frameRate: settings[2].options[0].value as string,
        rotate: settings[2].options[0].value as string,
      },
    };
  },
  actions: {
    updateOpenState(open: boolean) {
      this.open = open;
    },
    updateDefaultSettings(settings: VideoConverterOptions) {
      this.defaultSettings = settings;
    },
  },
});
