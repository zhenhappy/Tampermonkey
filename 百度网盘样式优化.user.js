// ==UserScript==
// @name         百度网盘样式优化
// @namespace    https://greasyfork.org/zh-CN/scripts/433769
// @version      0.5
// @description  解决百度网盘页面文件名称显示不完整
// @author       zhenhappy<q505507538@gmail.com>
// @match        https://pan.baidu.com/s/*
// @icon         https://pan.baidu.com/m-static/base/static/images/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    setTimeout(() => {
        $('.frame-content').css('margin-right', '0')
        $('.file-name.v20').html(document.title.replace('_免费高速下载|百度网盘-分享无限制', ''))
    }, 1000)
})();