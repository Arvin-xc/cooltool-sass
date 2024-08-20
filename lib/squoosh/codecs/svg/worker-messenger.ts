/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
import { wrap } from 'comlink'
import { abortable } from '../../util'
import FeatureWorker from './worker?worker'

/** How long the worker should be idle before terminating. */
const workerTimeout = 10_000

interface WorkerBridge {
  compress: (
    signal: AbortSignal,
    file: string
  ) => Promise<{ data: any, dimensions: number }>
}

class WorkerBridge {
  protected _queue = Promise.resolve() as Promise<unknown>
  /** Worker instance associated with this processor. */
  protected _worker?: Worker
  /** Comlinked worker API. */
  protected _workerApi?
  /** ID from setTimeout */
  protected _workerTimeout?: NodeJS.Timeout

  protected _terminateWorker() {
    if (!this._worker) return
    this._worker.terminate()
    this._worker = undefined
    this._workerApi = undefined
  }

  protected _startWorker() {
    this._worker = new FeatureWorker()
    this._workerApi = wrap(this._worker)
  }
}

WorkerBridge.prototype['compress'] = function (
  this: WorkerBridge,
  signal: AbortSignal,
  ...args: any
) {
  this._queue = this._queue
    // Ignore any errors in the queue
    .catch(() => {})
    .then(async () => {
      if (signal.aborted) throw new DOMException('AbortError', 'AbortError')

      clearTimeout(this._workerTimeout)
      if (!this._worker) this._startWorker()

      const onAbort = () => this._terminateWorker()
      signal.addEventListener('abort', onAbort)

      return abortable(signal, this._workerApi!['compress'](...args)).finally(
        () => {
          // No longer care about aborting - this task is complete.
          signal.removeEventListener('abort', onAbort)

          // Start a timer to clear up the worker.
          this._workerTimeout = setTimeout(() => {
            this._terminateWorker()
          }, workerTimeout)
        }
      )
    })

  return this._queue
} as any

export default WorkerBridge
