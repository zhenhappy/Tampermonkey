// ==UserScript==
// @name         WEB前端开发博客 清爽特别版
// @namespace    https://greasyfork.org/zh-CN/scripts/370792
// @version      0.4
// @description  最可恶的就是这个了,  整个页面全他妈的都是广告,  正文内容就那么一小丁点,  你让我是来看广告还是学习的,  果断都干掉
// @author       zhenhappy
// @match        http*://www.css88.com/*
// @require      https://code.jquery.com/jquery-3.3.1.slim.min.js
// ==/UserScript==

$(document).ready(() => {
  [
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
  ].forEach(item => $(item).remove())
})
