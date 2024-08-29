import { expose } from 'comlink'
// @ts-ignore
import { optimize } from 'svgo/dist/svgo.browser.js'

function compress(svgInput: string) {
  const result = optimize(svgInput, {
    multipass: true
  })
  return result
}

expose({ compress }, self as any)
