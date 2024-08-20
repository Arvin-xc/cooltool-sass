import type WorkerBridge from '../../../../worker-bridge'
import { type EncodeOptions } from '../shared/meta'

export const encode = (
  signal: AbortSignal,
  workerBridge: WorkerBridge,
  imageData: ImageData,
  options: EncodeOptions
) => workerBridge.wp2Encode(signal, imageData, options)
