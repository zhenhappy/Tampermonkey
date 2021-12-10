// ==UserScript==
// @name         百度网盘样式优化
// @namespace    https://greasyfork.org/zh-CN/scripts/433769
// @version      0.4
// @description  解决百度网盘页面文件名称显示不完整
// @author       zhenhappy<q505507538@gmail.com>
// @match        https://pan.baidu.com/s/*
// @icon         https://pan.baidu.com/m-static/base/static/images/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    $('.module-header').css('overflow', 'hidden')
    $('.slide-show-left').css('float', 'unset')
    $('.slide-show-left .file-name').css('max-width', 'unset')
    // document.querySelector('#layoutMain').style.minWidth = '1280px'
    document.querySelector('#layoutMain > div.frame-content > div.module-share-header > div > div.slide-show-left > h2').addEventListener('DOMSubtreeModified', function () {
        document.querySelector('#layoutMain > div.frame-content > div.module-share-header > div > div.slide-show-left > h2').removeChild(document.querySelector('#layoutMain > div.frame-content > div.module-share-header > div > div.slide-show-left > h2 > img'))
        var span = document.createElement('span')
        span.innerText = document.title.replace('_免费高速下载|百度网盘-分享无限制', '')
        document.querySelector('#layoutMain > div.frame-content > div.module-share-header > div > div.slide-show-left > h2').appendChild(span)
    });
})();