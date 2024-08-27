const fs = require('node:fs')

const scripts = [
  './node_modules/@huggingface/transformers/src/env.js',
  './node_modules/@huggingface/transformers/src/backends/onnx.js'
]

const hubScriptPath = './node_modules/.cache/vite/client/deps/@huggingface_transformers.js'

function replaceFn(scriptPath, origin, replace) {
  const envScript = fs.readFileSync(scriptPath, { encoding: 'utf-8' })

  try {
    fs.writeFileSync(
      scriptPath,
      envScript.replace(origin, replace),
      { encoding: 'utf-8' }
    )
  } catch (error) {
    console.log('replace-onnx-origin error', error)
  }
}
scripts.forEach(script => replaceFn(script, 'https://cdn.jsdelivr.net/npm', 'https://unpkg.com'))
replaceFn(hubScriptPath, 'fetch(urlOrPath, { headers })', `fetch(urlOrPath, { headers, referrerPolicy: 'no-referrer' })`)
replaceFn(hubScriptPath, 'fetch(urlOrPath)', `fetch(urlOrPath, { referrerPolicy: 'no-referrer' })`)
console.log('transformer.js packages cdn has replaced with https://unpkg.com')
