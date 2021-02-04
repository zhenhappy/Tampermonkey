// ==UserScript==
// @name         MDN 自动切换中文
// @namespace    https://greasyfork.org/zh-CN/scripts/421190
// @version      0.1
// @description  谷歌搜索的时候经常点击MDN文档打开的默认都是英文的, 很不方便, 来一个自动跳转, 如果需要其他语言, 手动点页面切换即可
// @author       You
// @match        https://developer.mozilla.org/**
// @icon         https://developer.mozilla.org/favicon144.png
// @grant        none
// ==/UserScript==

(function() {
    'use strict'
    var url = location.href.replace(/(developer\.mozilla\.org\/(?!zh\-CN))([^/]+)(\/.*)$/i, '$1zh-CN$3')
    location.href !== url && location.replace(url)
})();