// ==UserScript==
// @name         MDN 自动切换中文
// @namespace    https://greasyfork.org/zh-CN/scripts/421190
// @version      0.4
// @author       zhenhappy<q505507538@gmail.com>
// @description  谷歌搜索的时候经常点击MDN文档打开的默认都是英文的, 很不方便, 来一个自动跳转, 如果需要其他语言, 手动点页面切换即可
// @icon         https://developer.mozilla.org/favicon144.png
// @match        https://developer.mozilla.org/**
// @run-at       document-start
// ==/UserScript==

(function() {
    var url = window.location.href.replace(/(developer\.mozilla\.org\/(?!zh\-CN))([^/]+)(\/.*)$/i, '$1zh-CN$3')
    window.location.href !== url && window.location.replace(url)
    document.querySelector('.mdn-cta-container').style.display = 'none'
})()