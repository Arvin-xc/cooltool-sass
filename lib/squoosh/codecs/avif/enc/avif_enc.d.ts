export enum AVIFTune {
  auto,
  psnr,
  ssim
}
export type AVIFTune = typeof AVIFTune

export interface EncodeOptions {
  quality: number
  qualityAlpha: number
  denoiseLevel: number
  tileRowsLog2: number
  tileColsLog2: number
  speed: number
  subsample: number
  chromaDeltaQ: boolean
  sharpness: number
  enableSharpYUV: boolean
  tune: {
    auto: 0
    psnr: 1
    ssim: 2
  }
}

export interface AVIFModule extends EmscriptenWasm.Module {
  encode(
    data: BufferSource,
    width: number,
    height: number,
    options: EncodeOptions
  ): Uint8Array | null
}

declare let moduleFactory: EmscriptenWasm.ModuleFactory<AVIFModule>

export default moduleFactory
