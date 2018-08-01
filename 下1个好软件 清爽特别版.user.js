// ==UserScript==
// @name         下1个好软件 清爽特别版
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  这货非常贱, 居然用了googleads的反ADBlock插件, 必须把这货加入ADBlock的白名单, 然后再配合我这个插件才行
// @author       zhenhappy
// @match        http://xia1ge.com/**
// @match        https://xia1ge.com/**
// @match        http://www.xia1ge.com/**
// @match        https://www.xia1ge.com/**
// ==/UserScript==

(function() {
  'use strict';

  const $ = document.querySelector.bind(document);
  const $$ = document.querySelectorAll.bind(document);

  const removeList = [
      '#text-17',
      '#text-18',
      '#wpp-7',
      '#custom_html-2',
      '.adsbygoogle',
      '#aswift_0_expand'
  ]

  removeList.forEach(remove);

  function remove(el) {
      if (typeof el === "string") remove([...$$(el)]);
      else if (el instanceof HTMLElement) el.parentNode.removeChild(el);
      else if (el instanceof NodeList) remove([...el]);
      else if (el instanceof Array) el.forEach(remove);
  }
})();