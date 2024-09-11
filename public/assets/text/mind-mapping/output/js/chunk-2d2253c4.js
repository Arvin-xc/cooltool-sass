(window['webpackJsonp'] = window['webpackJsonp'] || []).push([['chunk-2d2253c4'], { e410: function (t, v, s) { 'use strict'; s.r(v); var c = function () { var t = this; t._self._c; return t._m(0) }, n = [function () { var t = this, v = t._self._c; return v('div', [v('h1', [t._v('如何复制、剪切、粘贴')]), v('h2', [t._v('使用按钮触发')]), v('p', [t._v('一个常规的思维导图一般会实现一个右键菜单，右键菜单中会提供复制、剪切、粘贴三个按钮，当点击了这三个按钮需要能执行复制、剪切、粘贴操作，这需要调用内部的一些方法来完成：')]), v('pre', { staticClass: 'hljs' }, [v('code', [v('span', { staticClass: 'hljs-comment' }, [t._v('// 点击了复制按钮')]), t._v('\n'), v('span', { staticClass: 'hljs-keyword' }, [t._v('const')]), t._v(' onCopyBtnClick = '), v('span', { staticClass: 'hljs-function' }, [t._v('() =>')]), t._v(' {\n    mindMap.renderer.copy()\n}\n\n'), v('span', { staticClass: 'hljs-comment' }, [t._v('// 点击了剪切按钮')]), t._v('\n'), v('span', { staticClass: 'hljs-keyword' }, [t._v('const')]), t._v(' onCutBtnClick = '), v('span', { staticClass: 'hljs-function' }, [t._v('() =>')]), t._v(' {\n    mindMap.renderer.cut()\n}\n\n'), v('span', { staticClass: 'hljs-comment' }, [t._v('// 点击了粘贴按钮')]), t._v('\n'), v('span', { staticClass: 'hljs-keyword' }, [t._v('const')]), t._v(' onPasteBtnClick = '), v('span', { staticClass: 'hljs-function' }, [t._v('() =>')]), t._v(' {\n    mindMap.renderer.paste()\n}\n')])]), v('p', [v('code', [t._v('copy')]), t._v('和'), v('code', [t._v('cut')]), t._v('方法会保存你当前激活的节点数据用于粘贴，如果浏览器及协议（https）支持'), v('code', [t._v('js')]), t._v('操作剪贴板数据，那么复制或剪切的节点数据也会同时添加到用户的剪贴板中，在其他地方也可以进行粘贴。')]), v('p', [v('code', [t._v('paste')]), t._v('方法会执行粘贴操作，如果浏览器及协议（https）支持'), v('code', [t._v('js')]), t._v('操作剪贴板数据，那么其他地方复制的数据也可以进行粘贴，比如你可以进行跨浏览器粘贴'), v('code', [t._v('simple-mind-map')]), t._v('节点，如果是非'), v('code', [t._v('simple-mind-map')]), t._v('节点数据，那么会提取出剪切板中的文本和图片进行粘贴，文本默认会粘贴为子节点，图片默认会添加到当前的节点中。')]), v('p', [t._v('如果浏览器或协议（https）不支持'), v('code', [t._v('js')]), t._v('操作剪贴板数据，那么'), v('code', [t._v('copy')]), t._v('和'), v('code', [t._v('cut')]), t._v('方法复制和剪切的数据只会保存在当前页面的内存中，无法在其他地方粘贴。')]), v('p', [t._v('如果复制或剪切了画布数据，同时剪切板中也存在数据，那么默认会以最新的'), v('code', [t._v('Ctrl+c')]), t._v('或'), v('code', [t._v('Ctrl+x')]), t._v('操作为准，比如你先复制了节点，然后又复制了其他地方的文本，那么会粘贴最后一次的操作，也就是其他地方复制的文本数据。')]), v('h2', [t._v('使用快捷键')]), v('p', [t._v('核心库内部默认支持'), v('code', [t._v('Ctrl+c')]), t._v('、'), v('code', [t._v('Ctrl+x')]), t._v('、'), v('code', [t._v('Ctrl+v')]), t._v('三个快捷键来执行复制、剪切、粘贴操作。')]), v('p', [t._v('当激活了某个节点，按'), v('code', [t._v('Ctrl+c')]), t._v('会复制当前激活节点的数据，按'), v('code', [t._v('Ctrl+x')]), t._v('会删除当前激活节点，同时保存该节点的数据供粘贴。')]), v('p', [t._v('当按了'), v('code', [t._v('Ctrl+c')]), t._v('或'), v('code', [t._v('Ctrl+x')]), t._v('后，按'), v('code', [t._v('Ctrl+v')]), t._v('会在当前激活的节点粘贴复制或剪切的数据。')]), v('p', [t._v('这三个快捷键内部调用的其实就是前面的'), v('code', [t._v('copy')]), t._v('、'), v('code', [t._v('cut')]), t._v('、'), v('code', [t._v('paste')]), t._v('方法。')]), v('h3', [t._v('完整示例')]), v('iframe', { staticStyle: { width: '100%', height: '455px', border: 'none' }, attrs: { src: 'https://wanglin2.github.io/playground/#eNrFVc1OGzEQfpWRqypJFXaD1FMaEIX20AMV4lpz2Ow6ianXXq29BIRy4VCgopeeeuyhUqUeeqhQJejrEKBv0fH+k0RVbkSKtJ75vm/Gnhn7mLyMIucgYaRLetqPeWRAM5NE61TyMFKxgWOI2aANSm6rRBoWtEGPPCHUeJcNYAKDWIXQQIVGydjmMtj2osxFiUazYCshWldCL6KESgAqBTNgbRa5BjIRgkoqXRfuTq6mp39urj9Mv32anv2+vTj/+/knlb6S2mAaWyo62jRyS3D/PRKbLVhbh2OrCYWeEzMZsJjFjo/gZovKyZz2+Y/p2emcdmKWl07MQuW7X1/uLy9nlXc8bdjS2pFFl+rl0TdrrNrRsXFx5M1ckIkuBMpPQiaNM2TmtWD2c/PoTdBs5MwtJY3HJYsbrXbGCjzjdYucsETEGiipmTKzYYfGmim5/Xp1//EEt54V1f4muZgF+iMuAtyUBb+rNGbkFkaZjXRzfXF3/X022MOAC4LuVb467pEyKD5zW8HjkptdpcxbFbAdpbnhSiKzIdjANNrQ8LF0WKa9FD5pvcC2wNboudm84qTiwjAcMs8wXAH0An4AvvC0XqMkL/crFipKUncO4EHlLZsBIT0XvXVgoWSUEn3PQoqN9PqJMUrChm/bGiEPxxOR2Qz33Az4X2I1e5aXzucyvAeThcxs/maY1Z6Kr55bOzJcanMkstPbyK8xShw3u7vy6XKYDh1fa0qwBPYKA3Bqp1u0z5gHZtSF1U7naYoDiMqixgwj8gOWOtJ+sP8ns1UopCqi19dKJCYjAtjW6EInXxkVVYv58CPGhyOEP+90osMi8uK4z8oryYuHHOMWqpEXBFwOC0OZupM3xZIZrxYZ5EmXaxTEhk5rQNokq4B9LZx9rSQ+Tqk8zR1YgXJYKcG3J5tQx8VPJ8arkofMFmulH6uxxvt0Hxn5sC14jzLufKktK89tQib/AMXMadM=' } })]) }], _ = {}, e = _, o = s('2877'), a = Object(o['a'])(e, c, n, !1, null, null, null); v['default'] = a.exports } }])
