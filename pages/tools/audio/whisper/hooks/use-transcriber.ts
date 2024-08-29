import { ref, reactive } from "vue";
import Constants from "../utils/Constants";
import { useWorker } from "./use-worker";

interface ProgressItem {
  file: string;
  loaded: number;
  progress: number;
  total: number;
  name: string;
  status: string;
}

interface TranscriberUpdateData {
  data: [
    string,
    { chunks: { text: string; timestamp: [number, number | null] }[] }
  ];
  text: string;
}

interface TranscriberCompleteData {
  data: {
    text: string;
    chunks: { text: string; timestamp: [number, number | null] }[];
  };
}

export interface TranscriberData {
  isBusy: boolean;
  text: string;
  chunks: { text: string; timestamp: [number, number | null] }[];
}

export interface Transcriber {
  onInputChange: () => void;
  isBusy: boolean;
  isModelLoading: boolean;
  progressItems: ProgressItem[];
  start: (audioData: AudioBuffer | undefined) => void;
  output?: TranscriberData;
  model: string;
  setModel: (model: string) => void;
  multilingual: boolean;
  setMultilingual: (model: boolean) => void;
  quantized: boolean;
  setQuantized: (model: boolean) => void;
  subtask: string;
  setSubtask: (subtask: string) => void;
  language?: string;
  setLanguage: (language: string) => void;
}

export function useTranscriber(): Transcriber {
  const transcript = ref<TranscriberData | undefined>(undefined);
  const isBusy = ref(false);
  const isModelLoading = ref(false);
  const progressItems = ref<ProgressItem[]>([]);

  const webWorker = useWorker((event) => {
    const message = event.data;
    // Update the state with the result
    switch (message.status) {
      case "progress":
        // Model file progress: update one of the progress items.
        progressItems.value = progressItems.value.map((item) => {
          if (item.file === message.file) {
            return { ...item, progress: message.progress };
          }
          return item;
        });
        break;
      case "update":
        // Received partial update
        const updateMessage = message as TranscriberUpdateData;
        console.log('update', updateMessage)
        transcript.value = {
          isBusy: true,
          text: updateMessage.data[0],
          chunks: updateMessage.data[1].chunks,
        };
        break;
      case "complete":
        // Received complete transcript
        const completeMessage = message as TranscriberCompleteData;
        transcript.value = {
          isBusy: false,
          text: completeMessage.data.text,
          chunks: completeMessage.data.chunks,
        };
        isBusy.value = false;
        break;
      case "initiate":
        // Model file start load: add a new progress item to the list.
        isModelLoading.value = true;
        progressItems.value.push(message);
        break;
      case "ready":
        isModelLoading.value = false;
        break;
      case "error":
        isBusy.value = false;
        alert(
          `${message.data.message} This is most likely because you are using Safari on an M1/M2 Mac. Please try again from Chrome, Firefox, or Edge.\n\nIf this is not the case, please file a bug report.`
        );
        break;
      case "done":
        // Model file loaded: remove the progress item from the list.
        progressItems.value = progressItems.value.filter(
          (item) => item.file !== message.file
        );
        break;
      default:
        break;
    }
  });

  const model = ref<string>(Constants.DEFAULT_MODEL);
  const subtask = ref<string>(Constants.DEFAULT_SUBTASK);
  const quantized = ref<boolean>(Constants.DEFAULT_QUANTIZED);
  const multilingual = ref<boolean>(Constants.DEFAULT_MULTILINGUAL);
  const language = ref<string>(Constants.DEFAULT_LANGUAGE);

  const onInputChange = () => {
    transcript.value = undefined;
  };

  const postRequest = async (audioData: AudioBuffer | undefined) => {
    if (audioData) {
      transcript.value = undefined;
      isBusy.value = true;

      let audio;
      if (audioData.numberOfChannels === 2) {
        const SCALING_FACTOR = Math.sqrt(2);

        const left = audioData.getChannelData(0);
        const right = audioData.getChannelData(1);

        audio = new Float32Array(left.length);
        for (let i = 0; i < audioData.length; ++i) {
          audio[i] = (SCALING_FACTOR * (left[i] + right[i])) / 2;
        }
      } else {
        // If the audio is not stereo, we can just use the first channel:
        audio = audioData.getChannelData(0);
      }

      webWorker.value?.postMessage({
        audio,
        model: model.value,
        multilingual: multilingual.value,
        quantized: quantized.value,
        subtask: multilingual.value ? subtask.value : null,
        language:
          multilingual.value && language.value !== "auto"
            ? language.value
            : null,
      });
    }
  };

  const transcriber = reactive({
    onInputChange,
    isBusy,
    isModelLoading,
    progressItems,
    start: postRequest,
    output: transcript,
    model,
    setModel: (newModel: string) => {
      model.value = newModel;
    },
    multilingual,
    setMultilingual: (newMultilingual: boolean) => {
      multilingual.value = newMultilingual;
    },
    quantized,
    setQuantized: (newQuantized: boolean) => {
      quantized.value = newQuantized;
    },
    subtask,
    setSubtask: (newSubtask: string) => {
      subtask.value = newSubtask;
    },
    language,
    setLanguage: (newLanguage: string) => {
      language.value = newLanguage;
    },
  });

  return transcriber;
}
