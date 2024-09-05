export type TransactionData = {
  status: "progress" | "done";
  progress?: number;
  type: string;
  mask: ImageData;
};

export class Matting {
  worker: Worker;
  constructor() {
    this.worker = new Worker(
      new URL("./matting-web-worker.ts", import.meta.url),
      {
        type: "module",
      }
    );
  }

  loadModule(progressCallback?: (data: TransactionData) => void) {
    this.worker.postMessage("");
    this.worker.addEventListener(
      "message",
      (event: { data: TransactionData }) => progressCallback?.(event.data)
    );
  }
  async maskToImage(
    url: string,
    progressCallback?: (data: TransactionData) => void
  ): Promise<Blob | null> {
    const RawImage = (await import("../transformers/transformers.js")).RawImage;
    const image = await RawImage.fromURL(url);
    this.worker.postMessage(url);

    return new Promise(async (resolve) => {
      this.worker.addEventListener(
        "message",
        async (event: { data: TransactionData }) => {
          const { type, mask } = event.data;
          if (type === "complete") {
            const canvas = document.createElement("canvas");
            canvas.width = image.width;
            canvas.height = image.height;
            const ctx = canvas.getContext("2d");

            if (ctx) {
              ctx.drawImage(image.toCanvas(), 0, 0);

              const pixelData = ctx.getImageData(
                0,
                0,
                image.width,
                image.height
              );
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
        }
      );
    });
  }

  downloadModel(progressCallback: (status: any) => void) {
    this.worker.postMessage({ method: "loadModel" });
    this.worker.addEventListener("message", progressCallback);
  }

  terminal() {
    this.worker.terminate();
  }
}
