// ==UserScript==
// @name         SoBooks 自动跳转
// @namespace    https://greasyfork.org/zh-CN/scripts/434291
// @version      0.2
// @description  SoBooks 网址中转免等待自动跳转
// @author       zhenhappy<q505507538@gmail.com>
// @match        https://sobooks.cc/go.html?url=*
// @icon         https://sobooks.cc/favicon.ico
// ==/UserScript==

(function() {
    window.location.replace(window.location.href.replace('https://sobooks.cc/go.html?url=',''))
})();