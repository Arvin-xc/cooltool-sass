(window['webpackJsonp'] = window['webpackJsonp'] || []).push([['chunk-2d0a514a'], { '08d0': function (s, a, t) { 'use strict'; t.r(a); var n = function () { var s = this; s._self._c; return s._m(0) }, v = [function () { var s = this, a = s._self._c; return a('div', [a('h1', [s._v('Markdown解析')]), a('blockquote', [a('p', [s._v('v0.4.7+')])]), a('p', [s._v('提供导入和导出'), a('code', [s._v('Markdown')]), s._v('文件的方法。')]), a('h2', [s._v('引入')]), a('pre', { staticClass: 'hljs' }, [a('code', [a('span', { staticClass: 'hljs-keyword' }, [s._v('import')]), s._v(' markdown '), a('span', { staticClass: 'hljs-keyword' }, [s._v('from')]), s._v(' '), a('span', { staticClass: 'hljs-string' }, [s._v('\'simple-mind-map/src/parse/markdown.js\'')]), s._v('\n')])]), a('p', [s._v('如果使用的是'), a('code', [s._v('umd')]), s._v('格式的文件，那么可以通过如下方式获取：')]), a('pre', { staticClass: 'hljs' }, [a('code', [a('span', { staticClass: 'hljs-tag' }, [s._v('<'), a('span', { staticClass: 'hljs-name' }, [s._v('script')]), s._v(' '), a('span', { staticClass: 'hljs-attr' }, [s._v('src')]), s._v('='), a('span', { staticClass: 'hljs-string' }, [s._v('"simple-mind-map/dist/simpleMindMap.umd.min.js"')]), s._v('>')]), a('span', { staticClass: 'hljs-tag' }, [s._v('</'), a('span', { staticClass: 'hljs-name' }, [s._v('script')]), s._v('>')]), s._v('\n')])]), a('pre', { staticClass: 'hljs' }, [a('code', [s._v('simpleMindMap.markdown\n')])]), a('h2', [s._v('方法')]), a('h3', [s._v('transformToMarkdown(data)')]), a('ul', [a('li', [a('code', [s._v('data')]), s._v('：思维导图数据，可以通过'), a('code', [s._v('mindMap.getData()')]), s._v('方法获取。')])]), a('p', [s._v('将思维导图数据转换成'), a('code', [s._v('Markdown')]), s._v('格式数据，返回的是字符串。')]), a('h3', [s._v('transformMarkdownTo(mdContent)')]), a('ul', [a('li', [a('code', [s._v('mdContent')]), s._v('：要转换的'), a('code', [s._v('Markdown')]), s._v('数据，字符串类型。')])]), a('p', [s._v('将'), a('code', [s._v('Markdown')]), s._v('字符串转换成节点树数据，返回一个'), a('code', [s._v('Promise')]), s._v('实例。可以使用'), a('code', [s._v('mindMap.setData()')]), s._v('方法将转换后的数据渲染到画布上。')])]) }], _ = {}, d = _, o = t('2877'), l = Object(o['a'])(d, n, v, !1, null, null, null); a['default'] = l.exports } }])
