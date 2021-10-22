// ==UserScript==
// @name         SoBooks 自动跳转
// @namespace    https://greasyfork.org/zh-CN/scripts/434291
// @version      0.1
// @description  SoBooks 网址中转免等待自动跳转
// @author       You
// @match        https://sobooks.cc/go.html?url=*
// @icon         https://sobooks.cc/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    window.location.replace(window.location.href.replace('https://sobooks.cc/go.html?url=',''))
    // Your code here...
})();