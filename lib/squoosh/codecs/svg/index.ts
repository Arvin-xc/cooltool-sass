import WorkerBridge from './worker-messenger'

export async function compress(file: string) {
  const abortController = new AbortController()
  const svgWorkerBridge = new WorkerBridge()
  const { data } = await svgWorkerBridge.compress(abortController.signal, file)
  return data
}
