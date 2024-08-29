import { RawImage } from "@huggingface/transformers";
export type TransactionData = {
  status: "progress" | "done";
  progress?: number;
};

const worker = new Worker(new URL("./matting-web-worker.ts", import.meta.url), {
  type: "module",
});

export function loadModule(progressCallback?: (data: TransactionData) => void) {
  worker.postMessage("");
  worker.addEventListener("message", (event) => progressCallback?.(event.data));
}
export async function maskToImage(
  url: string,
  progressCallback?: (data: TransactionData) => void
): Promise<Blob | null> {
  const image = await RawImage.fromURL(url);
  worker.postMessage(url);

  return new Promise(async (resolve) => {
    worker.addEventListener("message", async (event) => {
      const { type, mask } = event.data;
      if (type === "complete") {
        const canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext("2d");

        if (ctx) {
          ctx.drawImage(image.toCanvas(), 0, 0);

          const pixelData = ctx.getImageData(0, 0, image.width, image.height);
          for (let i = 0; i < mask.data.length; ++i) {
            pixelData.data[4 * i + 3] = mask.data[i];
          }
          ctx.putImageData(pixelData, 0, 0);
          canvas.toBlob((blob) => {
            resolve(blob);
          });
        }
      } else if (progressCallback) {
        progressCallback(event.data);
      }
    });
  });
}

export async function downloadModel(progressCallback: (status: any) => void) {
  const worker = new Worker(new URL("/matting-web-worker", import.meta.url));

  worker.postMessage({ method: "loadModel" });
  worker.addEventListener("message", progressCallback);
}
