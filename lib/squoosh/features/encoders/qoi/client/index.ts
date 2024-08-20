import type WorkerBridge from '../../../../worker-bridge'
import { type EncodeOptions } from '../shared/meta'

export function encode(
  signal: AbortSignal,
  workerBridge: WorkerBridge,
  imageData: ImageData,
  options: EncodeOptions
) {
  return workerBridge.qoiEncode(signal, imageData, options)
}
