// ==UserScript==
// @name         张鑫旭博客 特别清爽版
// @namespace    https://greasyfork.org/zh-CN/scripts/370790
// @version      0.1
// @description  去除张鑫旭博客上面各种广告, 并且将正文宽度调整到最适合观看的角度, 让你全身心的投入到阅读学习当中
// @author       zhenhappy
// @match        https://www.zhangxinxu.com/**
// ==/UserScript==

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

(function() {
    'use strict';

    const removeList = [
        '#sidebar',
        '.da_title',
        '.da_col2',
        '.link',
        '.ins_txt',
        '#daITxz2',
        '.hd_remind',
        '.description'
    ]

    removeList.forEach(remove);

    if (document.getElementById('content')) document.getElementById('content').style.marginLeft = "0";
    if (document.getElementById('content')) document.getElementById('content').style.marginRight = "0";
    if (document.getElementById('content')) document.getElementById('content').style.paddingLeft = "0";
    if (document.getElementById('content')) document.getElementById('content').style.paddingRight = "0";
    if (document.getElementById('respond')) document.getElementById('respond').style.paddingLeft = "0";
    if (document.getElementById('respond')) document.getElementById('respond').style.paddingRight = "0";
    if (document.querySelector('.commentlist')) document.querySelector('.commentlist').style.paddingLeft = "0";
    if (document.querySelector('.commentlist')) document.querySelector('.commentlist').style.paddingRight = "0";

    if (document.querySelector('#content > .post')) document.querySelector('#content > .post').style.marginLeft = "auto";
    if (document.querySelector('#content > .post')) document.querySelector('#content > .post').style.marginRight = "auto";
    if (document.getElementById('respond')) document.getElementById('respond').style.marginLeft = "auto";
    if (document.getElementById('respond')) document.getElementById('respond').style.marginRight = "auto";
    if (document.querySelector('.commentlist')) document.querySelector('.commentlist').style.marginLeft = "auto";
    if (document.querySelector('.commentlist')) document.querySelector('.commentlist').style.marginRight = "auto";

    if (document.querySelector('#content > .post')) document.querySelector('#content > .post').style.width = "1440px";
    if (document.querySelector('#content > .post')) document.querySelector('#content > .post').style.maxWidth = "90%";
    if (document.getElementById('respond')) document.getElementById('respond').style.width = "1440px";
    if (document.getElementById('respond')) document.getElementById('respond').style.maxWidth = "90%";
    if (document.querySelector('.commentlist')) document.querySelector('.commentlist').style.width = "1440px";
    if (document.querySelector('.commentlist')) document.querySelector('.commentlist').style.maxWidth = "90%";

})();

function remove(el) {
    if (typeof el === "string") remove([...$$(el)]);
    else if (el instanceof HTMLElement) el.parentNode.removeChild(el);
    else if (el instanceof NodeList) remove([...el]);
    else if (el instanceof Array) el.forEach(remove);
}