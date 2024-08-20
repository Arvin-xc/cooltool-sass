import type WorkerBridge from '../../../../worker-bridge'
import { type EncodeOptions } from '../shared/meta'

export async function encode(
  signal: AbortSignal,
  workerBridge: WorkerBridge,
  imageData: ImageData,
  options: EncodeOptions
) {
  return workerBridge.oxipngEncode(signal, imageData, options)
}
