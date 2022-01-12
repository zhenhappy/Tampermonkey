// ==UserScript==
// @name         ApkMirror下载优化
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  ApkMirror 无视AdBlock检测，直接进入下载页
// @author       zhenhappy<q505507538@gmail.com>
// @match        https://www.apkmirror.com/apk/*-download/$
// @icon         https://www.apkmirror.com/wp-content/themes/APKMirror/images/favicon.ico?v=2
// @require      https://unpkg.com/jquery/dist/jquery.slim.min.js
// ==/UserScript==

(function() {
    var t = setInterval(function () {
        var href = $('a.downloadButton').attr('href')
        if (href) {
            $('a.downloadButton').removeClass('')
            window.location.href = href
            clearInterval(t)
        }
    }, 10)
})();