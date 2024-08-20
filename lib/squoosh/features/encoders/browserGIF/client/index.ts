import { canvasEncode, canvasEncodeTest } from '../../../../util/canvas'
import type WorkerBridge from '../../../../worker-bridge'
import { type EncodeOptions, mimeType } from '../shared/meta'

export const featureTest = () => canvasEncodeTest(mimeType)
export const encode = (
  signal: AbortSignal,
  workerBridge: WorkerBridge,
  imageData: ImageData,
  options: EncodeOptions
) => canvasEncode(imageData, mimeType)
