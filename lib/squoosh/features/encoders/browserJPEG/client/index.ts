import { canvasEncode } from '../../../../util/canvas'
import type WorkerBridge from '../../../../worker-bridge'
import { mimeType, type EncodeOptions } from '../shared/meta'

export const encode = (
  signal: AbortSignal,
  workerBridge: WorkerBridge,
  imageData: ImageData,
  options: EncodeOptions
) => canvasEncode(imageData, mimeType, options.quality)
