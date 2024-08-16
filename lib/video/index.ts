import type { FFmpegParams } from "~/types/global";
// import pLimit from 'p-limit';

// const limit = pLimit(1);

// const input = [
// 	limit(() => fetchSomething('foo')),
// 	limit(() => fetchSomething('bar')),
// 	limit(() => doSomething())
// ];

// // Only one promise is run at once
// const result = await Promise.all(input);
// console.log(result);

export function convert(params: FFmpegParams) {
  return window.__electron_preload__invokeFFmpeg?.(params);
}
