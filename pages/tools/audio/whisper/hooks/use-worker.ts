import { ref, onMounted } from 'vue'

export interface MessageEventHandler {
  (event: MessageEvent): void
}

export function useWorker(messageEventHandler: MessageEventHandler) {
  const worker = ref<Worker | null>(null)

  const createWorker = () => {
    const newWorker = new Worker(new URL('../utils/worker.ts', import.meta.url), {
      type: 'module'
    })
    // Listen for messages from the Web Worker
    newWorker.addEventListener('message', messageEventHandler)
    worker.value = newWorker
  }

  onMounted(() => {
    if (!worker.value) {
      createWorker()
    }
  })

  return worker
}
