import { expose } from 'comlink'
import { optimize } from 'svgo/dist/svgo.browser.js'

function compress(svgInput) {
  const result = optimize(svgInput, {
    multipass: true
  })
  return result
}

expose({ compress }, self as any)
