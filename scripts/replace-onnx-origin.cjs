const fs = require("node:fs");

const scripts = [
  "./node_modules/@huggingface/transformers/src/env.js",
  "./node_modules/@huggingface/transformers/src/backends/onnx.js",
];

const hubScriptPaths = [
  "./node_modules/@huggingface/transformers/src/utils/hub.js",
  "./node_modules/.cache/vite/client/deps/@huggingface_transformers.js",
];

function replaceFn(scriptPath, origin, replace) {
  const envScript = fs.readFileSync(scriptPath, { encoding: "utf-8" });

  try {
    fs.writeFileSync(scriptPath, envScript.replace(origin, replace), {
      encoding: "utf-8",
    });
  } catch (error) {
    console.log("replace-onnx-origin error", error);
  }
}
scripts.forEach((script) =>
  replaceFn(script, "https://cdn.jsdelivr.net/npm", "https://unpkg.com")
);
hubScriptPaths.forEach((script) => {
  try {
    replaceFn(
      script,
      "fetch(urlOrPath, { headers })",
      `fetch(urlOrPath, { headers, referrerPolicy: 'no-referrer' })`
    );
    replaceFn(
      script,
      "fetch(urlOrPath)",
      `fetch(urlOrPath, { referrerPolicy: 'no-referrer' })`
    );
    console.log(
      "transformer.js packages cdn has replaced with https://unpkg.com"
    );
  } catch (error) {
    console.error(error);
  }
});
