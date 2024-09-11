(window['webpackJsonp'] = window['webpackJsonp'] || []).push([['chunk-2d2375fa'], { fb9a: function (s, a, n) { 'use strict'; n.r(a); var t = function () { var s = this; s._self._c; return s._m(0) }, l = [function () { var s = this, a = s._self._c; return a('div', [a('h1', [s._v('如何渲染一个右键菜单')]), a('p', [s._v('右键菜单可以方便的完成一些功能，大体上分两种，一是在画布上点击右键，二是在节点上点击右键，两者的功能肯定是不一样的，甚至根节点和其他节点功能上也有些不同，比如根节点不能添加同级节点，也不能被删除等等。')]), a('p', [s._v('右键菜单的UI界面需要你自行开发，可以设置成绝对定位或固定定位，然后让它显示在鼠标右键点击的位置即可。')]), a('h2', [s._v('右键菜单的显示和隐藏')]), a('p', [s._v('首先监听'), a('code', [s._v('node_contextmenu')]), s._v('事件在右键点击节点时显示菜单：')]), a('pre', { staticClass: 'hljs' }, [a('code', [a('span', { staticClass: 'hljs-comment' }, [s._v('// 当前右键点击的类型')]), s._v('\n'), a('span', { staticClass: 'hljs-keyword' }, [s._v('const')]), s._v(' type = ref('), a('span', { staticClass: 'hljs-string' }, [s._v('\'\'')]), s._v(')\n'), a('span', { staticClass: 'hljs-comment' }, [s._v('// 如果点击的节点，那么代表被点击的节点')]), s._v('\n'), a('span', { staticClass: 'hljs-keyword' }, [s._v('const')]), s._v(' currentNode = shallowRef('), a('span', { staticClass: 'hljs-literal' }, [s._v('null')]), s._v(')\n'), a('span', { staticClass: 'hljs-comment' }, [s._v('// 菜单显示的位置')]), s._v('\n'), a('span', { staticClass: 'hljs-keyword' }, [s._v('const')]), s._v(' left = ref('), a('span', { staticClass: 'hljs-number' }, [s._v('0')]), s._v(')\n'), a('span', { staticClass: 'hljs-keyword' }, [s._v('const')]), s._v(' top = ref('), a('span', { staticClass: 'hljs-number' }, [s._v('0')]), s._v(')\n'), a('span', { staticClass: 'hljs-comment' }, [s._v('// 是否显示菜单')]), s._v('\n'), a('span', { staticClass: 'hljs-keyword' }, [s._v('const')]), s._v(' show = ref('), a('span', { staticClass: 'hljs-literal' }, [s._v('false')]), s._v(')\n\nmindMap.on('), a('span', { staticClass: 'hljs-string' }, [s._v('\'node_contextmenu\'')]), s._v(', '), a('span', { staticClass: 'hljs-function' }, [s._v('('), a('span', { staticClass: 'hljs-params' }, [s._v('e, node')]), s._v(') =>')]), s._v(' {\n    type.value = '), a('span', { staticClass: 'hljs-string' }, [s._v('\'node\'')]), s._v('\n    left.value = e.clientX + '), a('span', { staticClass: 'hljs-number' }, [s._v('10')]), s._v('\n    top.value = e.clientY + '), a('span', { staticClass: 'hljs-number' }, [s._v('10')]), s._v('\n    show.value = '), a('span', { staticClass: 'hljs-literal' }, [s._v('true')]), s._v('\n    currentNode.value = node\n})\n')])]), a('p', [s._v('你可以根据当前点击的节点来判断一些操作是否可用。比如根节点不能删除，不能插入同级节点，又比如同级第一个节点不能再被往上移，同级最后一个节点不能被往下移。')]), a('p', [s._v('对于画布的处理会比较麻烦，不能直接监听'), a('code', [s._v('contextmenu')]), s._v('事件，因为会和右键多选节点冲突，所以需要结合'), a('code', [s._v('mousedown')]), s._v('事件和'), a('code', [s._v('mouseup')]), s._v('事件来处理。')]), a('pre', { staticClass: 'hljs' }, [a('code', [a('span', { staticClass: 'hljs-comment' }, [s._v('// 记录鼠标右键按下的位置')]), s._v('\n'), a('span', { staticClass: 'hljs-keyword' }, [s._v('const')]), s._v(' mousedownX = ref('), a('span', { staticClass: 'hljs-number' }, [s._v('0')]), s._v(')\n'), a('span', { staticClass: 'hljs-keyword' }, [s._v('const')]), s._v(' mousedownY = ref('), a('span', { staticClass: 'hljs-number' }, [s._v('0')]), s._v(')\n'), a('span', { staticClass: 'hljs-keyword' }, [s._v('const')]), s._v(' isMousedown = ref('), a('span', { staticClass: 'hljs-literal' }, [s._v('false')]), s._v(')\n\nmindMap.on('), a('span', { staticClass: 'hljs-string' }, [s._v('\'svg_mousedown\'')]), s._v(', '), a('span', { staticClass: 'hljs-function' }, [s._v('('), a('span', { staticClass: 'hljs-params' }, [s._v('e')]), s._v(') =>')]), s._v(' {\n    '), a('span', { staticClass: 'hljs-comment' }, [s._v('// 如果不是右键点击直接返回')]), s._v('\n    '), a('span', { staticClass: 'hljs-keyword' }, [s._v('if')]), s._v(' (e.which !== '), a('span', { staticClass: 'hljs-number' }, [s._v('3')]), s._v(') {\n        '), a('span', { staticClass: 'hljs-keyword' }, [s._v('return')]), s._v('\n    }\n    mousedownX.value = e.clientX\n    mousedownY.value = e.clientY\n    isMousedown.value = '), a('span', { staticClass: 'hljs-literal' }, [s._v('true')]), s._v('\n})\n\nmindMap.on('), a('span', { staticClass: 'hljs-string' }, [s._v('\'mouseup\'')]), s._v(', '), a('span', { staticClass: 'hljs-function' }, [s._v('('), a('span', { staticClass: 'hljs-params' }, [s._v('e')]), s._v(') =>')]), s._v(' {\n    '), a('span', { staticClass: 'hljs-keyword' }, [s._v('if')]), s._v(' (!isMousedown.value) {\n        '), a('span', { staticClass: 'hljs-keyword' }, [s._v('return')]), s._v('\n    }\n    isMousedown.value = '), a('span', { staticClass: 'hljs-literal' }, [s._v('false')]), s._v('\n    '), a('span', { staticClass: 'hljs-comment' }, [s._v('// 如果鼠标松开和按下的距离大于3，则不认为是点击事件')]), s._v('\n    '), a('span', { staticClass: 'hljs-keyword' }, [s._v('if')]), s._v(' (\n        '), a('span', { staticClass: 'hljs-built_in' }, [s._v('Math')]), s._v('.abs(mousedownX.value - e.clientX) > '), a('span', { staticClass: 'hljs-number' }, [s._v('3')]), s._v(' ||\n        '), a('span', { staticClass: 'hljs-built_in' }, [s._v('Math')]), s._v('.abs(mousedownX.value - e.clientY) > '), a('span', { staticClass: 'hljs-number' }, [s._v('3')]), s._v('\n    ) {\n        hide()\n        '), a('span', { staticClass: 'hljs-keyword' }, [s._v('return')]), s._v('\n    }\n    type.value = '), a('span', { staticClass: 'hljs-string' }, [s._v('\'svg\'')]), s._v('\n    left.value = e.clientX + '), a('span', { staticClass: 'hljs-number' }, [s._v('10')]), s._v('\n    top.value = e.clientY + '), a('span', { staticClass: 'hljs-number' }, [s._v('10')]), s._v('\n    show.value = '), a('span', { staticClass: 'hljs-literal' }, [s._v('true')]), s._v('\n})\n')])]), a('p', [s._v('很简单，其实就是判断鼠标按下和松开的距离是否很小，是的话就认为是点击事件，否则应该是鼠标拖动。')]), a('p', [s._v('右键菜单显示了，肯定就需要隐藏，当左键点击了画布、左键点击了节点、左键点击了展开收起按钮时都需要隐藏右键菜单。')]), a('pre', { staticClass: 'hljs' }, [a('code', [a('span', { staticClass: 'hljs-keyword' }, [s._v('const')]), s._v(' hide = '), a('span', { staticClass: 'hljs-function' }, [s._v('() =>')]), s._v(' {\n    show.value = '), a('span', { staticClass: 'hljs-literal' }, [s._v('false')]), s._v('\n    left.value = '), a('span', { staticClass: 'hljs-number' }, [s._v('0')]), s._v('\n    top.value = '), a('span', { staticClass: 'hljs-number' }, [s._v('0')]), s._v('\n    type.value = '), a('span', { staticClass: 'hljs-string' }, [s._v('\'\'')]), s._v('\n}\nmindMap.on('), a('span', { staticClass: 'hljs-string' }, [s._v('\'node_click\'')]), s._v(', hide)\nmindMap.on('), a('span', { staticClass: 'hljs-string' }, [s._v('\'draw_click\'')]), s._v(', hide)\nmindMap.on('), a('span', { staticClass: 'hljs-string' }, [s._v('\'expand_btn_click\'')]), s._v(', hide)\n')])]), a('h2', [s._v('复制、剪切、粘贴的实现')]), a('p', [s._v('接下来介绍一下复制、剪切、粘贴的实现。')]), a('p', [s._v('一般来说你的右键菜单中肯定也会添加这三个按钮，当点击这三个按钮时你需要调用对应的方法：')]), a('pre', { staticClass: 'hljs' }, [a('code', [a('span', { staticClass: 'hljs-comment' }, [s._v('// 当点击了复制按钮时调用')]), s._v('\nmindMap.renderer.copy()\n\n'), a('span', { staticClass: 'hljs-comment' }, [s._v('// 当点击了剪切按钮时调用')]), s._v('\nmindMap.renderer.cut()\n\n'), a('span', { staticClass: 'hljs-comment' }, [s._v('// 当点击了粘贴按钮时调用')]), s._v('\nmindMap.renderer.paste()\n')])])]) }], e = {}, v = e, _ = n('2877'), i = Object(_['a'])(v, t, l, !1, null, null, null); a['default'] = i.exports } }])
