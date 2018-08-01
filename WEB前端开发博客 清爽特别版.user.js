// ==UserScript==
// @name         WEB前端开发博客 清爽特别版
// @namespace    https://greasyfork.org/zh-CN/scripts/370792
// @version      0.2
// @description  最可恶的就是这个了,  整个页面全他妈的都是广告,  正文内容就那么一小丁点,  你让我是来看广告还是学习的,  果断都干掉
// @author       zhenhappy
// @match        http://www.css88.com/*
// ==/UserScript==

(function() {
    'use strict';
  
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);
  
    const removeList = [
        '#threebar',
        '#secondary',
        '.top-yideng-link',
        '.basebreadcrumb',
        '#home-page-widgets',
        '.my-wallet',
        '.related-wrap',
        '.follow-wrap',
        '.top-post-top-link',
        "#site-navigation > ul > li:last-child"
    ];
    removeList.forEach(remove);
  
    function remove(el) {
        if (typeof el === "string") remove([...$$(el)]);
        else if (el instanceof HTMLElement) el.parentNode.removeChild(el);
        else if (el instanceof NodeList) remove([...el]);
        else if (el instanceof Array) el.forEach(remove);
    }
  })();