/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
import { wrap } from 'comlink'
import FeatureWorker from '../features-worker?worker'
import type { ProcessorWorkerApi } from '../features-worker'
import { abortable } from '../util'
import { type BridgeMethods, methodNames } from './meta'

/** How long the worker should be idle before terminating. */
const workerTimeout = 10_000

interface WorkerBridge extends BridgeMethods {}

class WorkerBridge {
  protected _queue = Promise.resolve() as Promise<unknown>
  /** Worker instance associated with this processor. */
  protected _worker?: Worker
  /** Comlinked worker API. */
  protected _workerApi?: ProcessorWorkerApi
  /** ID from setTimeout */
  protected _workerTimeout?: NodeJS.Timeout

  protected _terminateWorker() {
    if (!this._worker) return
    this._worker.terminate()
    this._worker = undefined
    this._workerApi = undefined
  }

  protected _startWorker() {
    console.log(new URL('../features-worker/index', import.meta.url))
    this._worker = new FeatureWorker()
    this._workerApi = wrap<ProcessorWorkerApi>(this._worker)
  }
}

for (const methodName of methodNames) {
  WorkerBridge.prototype[methodName] = function (
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

        return abortable(
          signal,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          this._workerApi![methodName](...args)
        ).finally(() => {
          // No longer care about aborting - this task is complete.
          signal.removeEventListener('abort', onAbort)

          // Start a timer to clear up the worker.
          this._workerTimeout = setTimeout(() => {
            this._terminateWorker()
          }, workerTimeout)
        })
      })

    return this._queue
  } as any
}

export default WorkerBridge
