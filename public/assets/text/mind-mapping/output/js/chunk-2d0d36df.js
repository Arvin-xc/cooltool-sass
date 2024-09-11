(window['webpackJsonp'] = window['webpackJsonp'] || []).push([['chunk-2d0d36df'], { '5d71': function (e, t, n) { 'use strict'; n.r(t); var i = function () { var e = this; e._self._c; return e._m(0) }, o = [function () { var e = this, t = e._self._c; return t('div', [t('h1', [e._v('Demonstrate plugin')]), t('blockquote', [t('p', [e._v('v0.9.11+')])]), t('p', [e._v('The '), t('code', [e._v('Demonstrate')]), e._v(' plugin provides demonstration functionality.')]), t('p', [e._v('When entering demonstration mode, the container elements will be automatically displayed in full screen, and then default to the root node. You can switch between the previous and next steps by pressing the left and right arrow keys on the keyboard, and exit demonstration mode by pressing the \'Esc\' key.')]), t('p', [e._v('After entering demonstration mode, all shortcut keys on the mind map will be unavailable, and the mouse will not be able to operate the mind map.')]), t('h2', [e._v('Register')]), t('pre', { staticClass: 'hljs' }, [t('code', [t('span', { staticClass: 'hljs-keyword' }, [e._v('import')]), e._v(' MindMap '), t('span', { staticClass: 'hljs-keyword' }, [e._v('from')]), e._v(' '), t('span', { staticClass: 'hljs-string' }, [e._v('\'simple-mind-map\'')]), e._v('\n'), t('span', { staticClass: 'hljs-keyword' }, [e._v('import')]), e._v(' Demonstrate '), t('span', { staticClass: 'hljs-keyword' }, [e._v('from')]), e._v(' '), t('span', { staticClass: 'hljs-string' }, [e._v('\'simple-mind-map/src/plugins/Demonstrate.js\'')]), e._v('\n\nMindMap.usePlugin(Demonstrate)\n')])]), t('p', [e._v('After registration and instantiation of '), t('code', [e._v('MindMap')]), e._v(', the instance can be obtained through '), t('code', [e._v('mindMap.demonstrate')]), e._v('.')]), t('h3', [e._v('Config')]), t('p', [e._v('This plugin provides some configuration items for configuration, which can be configured through the instantiation option \'demonstrateConfig\'. Please refer to the 【Instantiation options】 section in the 【Constructor】 section for details.')]), t('h3', [e._v('Event')]), t('p', [e._v('The plugin will dispatch the following events:')]), t('p', [t('code', [e._v('exit_demonstrate')]), e._v('：Triggered when exiting the demonstration.')]), t('p', [t('code', [e._v('demonstrate_jump')]), e._v('：Triggered when jumping.')]), t('p', [e._v('Please refer to the \'on\' function in the 【Instance methods】 section of the 【Constructor】 chapter for details.')]), t('h2', [e._v('Props')]), t('h3', [e._v('stepList')]), t('p', [e._v('List of all steps demonstrated. Available when the \'enter\' method is called.')]), t('h3', [e._v('currentStepIndex')]), t('p', [e._v('The index of the steps currently played, counting from 0.')]), t('h3', [e._v('config')]), t('p', [e._v('The current configuration of the plugin.')]), t('h2', [e._v('Methods')]), t('h3', [e._v('enter()')]), t('p', [e._v('Entering demonstration mode will automatically display the container elements in full screen.')]), t('h3', [e._v('exit()')]), t('p', [e._v('Exit demonstration mode, which can also be exited by pressing the \'Esc\' key.')]), t('h3', [e._v('prev()')]), t('p', [e._v('Previous step.')]), t('h3', [e._v('next()')]), t('p', [e._v('Next step.')]), t('h3', [e._v('jump(index)')]), t('ul', [t('li', [t('code', [e._v('index')]), e._v('：Number，To jump to a certain step, count from 0.')])]), t('p', [e._v('Jump to a certain step.')])]) }], s = {}, a = s, r = n('2877'), l = Object(r['a'])(a, i, o, !1, null, null, null); t['default'] = l.exports } }])
