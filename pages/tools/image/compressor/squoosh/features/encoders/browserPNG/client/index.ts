import { canvasEncode } from '../../../../util/canvas'
import type WorkerBridge from '../../../../worker-bridge'
import { mimeType } from '../shared/meta'

export const encode = (
  signal: AbortSignal,
  workerBridge: WorkerBridge,
  imageData: ImageData
) => canvasEncode(imageData, mimeType)
