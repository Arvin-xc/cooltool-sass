(window['webpackJsonp'] = window['webpackJsonp'] || []).push([['chunk-2d210a7a'], { b98e: function (e, t, n) { 'use strict'; n.r(t); var a = function () { var e = this; e._self._c; return e._m(0) }, i = [function () { var e = this, t = e._self._c; return t('div', [t('h1', [e._v('MiniMap plugin')]), t('blockquote', [t('p', [e._v('v0.2.11+')])]), t('p', [e._v('Used to help quickly develop a small map feature, the small map consists of two parts, one is the current canvas content, and the other is the viewport frame. When zoomed, moved, or there are too many elements, the canvas may only display part of the mind map content. The viewport frame can be used to view the current viewport location, and can be quickly positioned by dragging on the small map.')]), t('h2', [e._v('Register')]), t('pre', { staticClass: 'hljs' }, [t('code', [t('span', { staticClass: 'hljs-keyword' }, [e._v('import')]), e._v(' MindMap '), t('span', { staticClass: 'hljs-keyword' }, [e._v('from')]), e._v(' '), t('span', { staticClass: 'hljs-string' }, [e._v('\'simple-mind-map\'')]), e._v('\n'), t('span', { staticClass: 'hljs-keyword' }, [e._v('import')]), e._v(' MiniMap '), t('span', { staticClass: 'hljs-keyword' }, [e._v('from')]), e._v(' '), t('span', { staticClass: 'hljs-string' }, [e._v('\'simple-mind-map/src/plugins/MiniMap.js\'')]), e._v('\n'), t('span', { staticClass: 'hljs-comment' }, [e._v('// import MiniMap from \'simple-mind-map/src/MiniMap.js\' Use this path for versions below v0.6.0')]), e._v('\n\nMindMap.usePlugin(MiniMap)\n')])]), t('p', [e._v('After registration and instantiation of '), t('code', [e._v('MindMap')]), e._v(', the instance can be obtained through '), t('code', [e._v('mindMap.miniMap')]), e._v('.')]), t('h2', [e._v('Methods')]), t('h3', [e._v('calculationMiniMap(boxWidth, boxHeight)')]), t('p', [e._v('"Calculate the rendering data for the small map, this function will call the '), t('code', [e._v('getMiniMap()')]), e._v(' method, so using this function is sufficient.')]), t('p', [t('code', [e._v('boxWidth')]), e._v(': the width of the small map container')]), t('p', [t('code', [e._v('boxHeight')]), e._v(': the height of the small map container')]), t('p', [e._v('Function return content:')]), t('pre', { staticClass: 'hljs' }, [t('code', [e._v('{\n      getImgUrl,'), t('span', { staticClass: 'hljs-comment' }, [e._v('// v0.8.0+, An asynchronous function that you can call and pass a callback function. The callback function can receive a parameter representing a small map of the image type, and you can render it through the img tag')]), e._v('\n      svgHTML, '), t('span', { staticClass: 'hljs-comment' }, [e._v('// Mini map HTML, it is recommended to use the getImgUrl method to obtain image type mini maps, reduce the number of page DOM, and optimize performance')]), e._v('\n      viewBoxStyle, '), t('span', { staticClass: 'hljs-comment' }, [e._v('// view box position information')]), e._v('\n      miniMapBoxScale, '), t('span', { staticClass: 'hljs-comment' }, [e._v('// view box zoom value')]), e._v('\n      miniMapBoxLeft, '), t('span', { staticClass: 'hljs-comment' }, [e._v('// view box left value')]), e._v('\n      miniMapBoxTop, '), t('span', { staticClass: 'hljs-comment' }, [e._v('// view box top value')]), e._v('\n}\n')])]), t('p', [e._v('Small map idea:')]), t('p', [e._v('1.Prepare a container element '), t('code', [e._v('container')]), e._v(', position is not '), t('code', [e._v('static')])]), t('p', [e._v('If using rich text editing mode, it is best to remove the default style from the elements inside the \'container\', otherwise there may be text offset issues within nodes:')]), t('pre', { staticClass: 'hljs' }, [t('code', [t('span', { staticClass: 'hljs-selector-class' }, [e._v('.container')]), e._v(' * {\n  '), t('span', { staticClass: 'hljs-attribute' }, [e._v('margin')]), e._v(': '), t('span', { staticClass: 'hljs-number' }, [e._v('0')]), e._v(';\n  '), t('span', { staticClass: 'hljs-attribute' }, [e._v('padding')]), e._v(': '), t('span', { staticClass: 'hljs-number' }, [e._v('0')]), e._v(';\n}\n')])]), t('p', [e._v('2.In '), t('code', [e._v('container')]), e._v(', create a small map container element '), t('code', [e._v('miniMapContainer')]), e._v(', absolute positioning')]), t('p', [e._v('3.In '), t('code', [e._v('container')]), e._v(', create a view box element '), t('code', [e._v('viewBoxContainer')]), e._v(', absolute positioning, set border style, transition property (optional)')]), t('p', [e._v('4.Listen for '), t('code', [e._v('data_change')]), e._v(' and '), t('code', [e._v('view_data_change')]), e._v(' events, and in this event call the '), t('code', [e._v('calculationMiniMap')]), e._v(' method to get calculation data, then render '), t('code', [e._v('svgHTML')]), e._v(' to the '), t('code', [e._v('miniMapContainer')]), e._v(' element and set '), t('code', [e._v('miniMapContainer')]), e._v(' element style:')]), t('pre', { staticClass: 'hljs' }, [t('code', [e._v(':style='), t('span', { staticClass: 'hljs-string' }, [e._v('"{\n    transform: `scale(${miniMapBoxScale})`,\n    left: miniMapBoxLeft + \'px\',\n    top: miniMapBoxTop + \'px\',\n}"')]), e._v('\n')])]), t('p', [e._v('5.Set the '), t('code', [e._v('viewBoxStyle')]), e._v(' object as the style of the '), t('code', [e._v('viewBoxContainer')]), e._v(' element')]), t('p', [e._v('At this point, when the mind map on the canvas changes, the small map will also be updated in real time, and the view box element will reflect the position of the viewport on the mind map graph in real time')]), t('p', [e._v('6.Listen for the '), t('code', [e._v('mousedown')]), e._v(', '), t('code', [e._v('mousemove')]), e._v(', and '), t('code', [e._v('mouseup')]), e._v(' events of the '), t('code', [e._v('container')]), e._v(' element, and call the three methods that will be introduced below to achieve the effect of the mind map on the canvas being dragged with the mouse')]), t('h3', [e._v('onMousedown(e)')]), t('p', [e._v('Small map mouse down event executes this function')]), t('p', [t('code', [e._v('e')]), e._v(': event object')]), t('h3', [e._v('onMousemove(e, sensitivityNum = 5)')]), t('p', [e._v('This function is executed on the small map mouse move event.')]), t('p', [t('code', [e._v('e')]), e._v(': event object')]), t('p', [t('code', [e._v('sensitivityNum')]), e._v(': drag sensitivity, the higher the sensitivity, the greater the actual canvas dragging distance on the small map when dragging the same distance on the small map')]), t('h3', [e._v('onMouseup()')]), t('p', [e._v('This function is executed on the small map mouse release event.')])]) }], s = {}, o = s, v = n('2877'), l = Object(v['a'])(o, a, i, !1, null, null, null); t['default'] = l.exports } }])
