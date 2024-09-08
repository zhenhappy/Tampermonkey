// ==UserScript==
// @name         音乐磁场自动回复隐藏帖
// @namespace    https://greasyfork.org/zh-CN/scripts/507531
// @version      2024-09-09
// @description  自动回复音乐磁场论坛上的隐藏帖
// @author       zhenhappy<q505507538@gmail.com>
// @match        https://www.hifini.com/thread-*.htm
// @icon         https://www.hifini.com/favicon.ico
// @require      https://unpkg.com/jquery/dist/jquery.slim.min.js
// @run-at       document-body
// @license      MIT
// ==/UserScript==

(function() {
  $('#message').val('谢谢分享')
  setTimeout(() => {
    $('#submit').trigger('click')
  }, 500)
})();