// ==UserScript==
// @name         MSDN 我告诉你 清爽特别版
// @namespace    https://greasyfork.org/zh-CN/scripts/370788
// @version      0.2
// @description  MSDN 我告诉你 去除广告, 界面宽度100%(解决默写内容太长看不到的问题), 去除捐赠提示
// @author       zhenhappy
// @match        https://msdn.itellyou.cn/*
// ==/UserScript==


(function() {
    'use strict';
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    remove('#view_data_container img')
    $$(".container").forEach(el => el.style.width = "100%")
    document.cookie="never_show_donate_auto=true;expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/"
    document.addEventListener("DOMSubtreeModified", e => {
        remove($$(".shang_box"));
        remove($$('.detail > pre:nth-child(3)'));
    }, false)

    function remove(el) {
    if (typeof el === "string") remove([...$$(el)]);
    else if (el instanceof HTMLElement) el.parentNode.removeChild(el);
    else if (el instanceof NodeList) remove([...el]);
    else if (el instanceof Array) el.forEach(remove);
}
})();