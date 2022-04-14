// ==UserScript==
// @name         A姐分享 页面优化
// @namespace    https://greasyfork.org/en/scripts/443351
// @version      0.3
// @description  解除复制限制
// @author       zhenhappy<q505507538@gmail.com>
// @match        https://www.abskoop.com/*/
// @icon         https://www.abskoop.com/wp-content/uploads/2021/07/1625221481-04bb5153c0db541-192x192.webp
// @require      https://unpkg.com/jquery/dist/jquery.slim.min.js
// @grant        none
// @license      MIT
// ==/UserScript==

(function() {
    $('body').css("cssText", "-moz-user-select: auto !important; -webkit-user-select: auto !important; -ms-user-select: auto !important; -khtml-user-select: auto !important; user-select: auto !important")
    setInterval(function () {
        if (document.ondragstart !== null) document.ondragstart = null
        if (document.onselectstart !== null) document.onselectstart = null
        if (document.onbeforecopy !== null) document.onbeforecopy = null
        if (document.onmouseup !== null) document.onmouseup = null
        if (document.onselect !== null) document.onselect = null
        if (document.oncopy !== null) document.oncopy = null
    }, 500)
})();
