// ==UserScript==
// @name         百度网盘样式优化
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://pan.baidu.com/s/*
// @icon         https://pan.baidu.com/m-static/base/static/images/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    document.querySelector('#layoutMain').style.minWidth = '1920px'
    document.querySelector('#layoutMain > div.frame-content > div.module-share-header > div > div.slide-show-left > h2').addEventListener('DOMSubtreeModified', function () {
        document.querySelector('#layoutMain > div.frame-content > div.module-share-header > div > div.slide-show-left > h2').removeChild(document.querySelector('#layoutMain > div.frame-content > div.module-share-header > div > div.slide-show-left > h2 > img'))
        var span = document.createElement('span')
        span.innerText = document.title.replace('_免费高速下载|百度网盘-分享无限制', '')
        document.querySelector('#layoutMain > div.frame-content > div.module-share-header > div > div.slide-show-left > h2').appendChild(span)
    });
})();