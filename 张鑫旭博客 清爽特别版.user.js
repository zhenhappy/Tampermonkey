// ==UserScript==
// @name         张鑫旭博客 清爽特别版
// @namespace    https://greasyfork.org/zh-CN/scripts/370790
// @version      0.3
// @description  张鑫旭这小子上面广告各种动态生成, 相比一般的广告技术来说还是贼牛逼的, 一般的ADBlocker去不掉, 所以通过脚本一个个去掉了, 并且将正文宽度调整到最佳合观看的角度, 让你心无旁骛的投入到愉快学习当中
// @author       zhenhappy
// @run-at       document-start
// @match        http*://www.zhangxinxu.com/**
// @require      https://code.jquery.com/jquery-3.3.1.slim.min.js
// ==/UserScript==

document.documentElement.style.display = 'none'

$(document).ready(() => {
    'use strict';

    $('#sidebar, .da_title, .da_col2, .link, .ins_txt, #daITxz2, .hd_remind, .description').remove()

    $('#content').css({
        'margin-left': '0',
        'margin-right': '0',
    })
    $('#content, #respond, .commentlist').css({
        'padding-left': '0',
        'padding-right': '0'
    })
    $('#content > .post, #respond, .commentlist').css({
        'margin-left': 'auto',
        'margin-right': 'auto',
        'width': '1440px',
        'max-width': '90%'
    })

    document.documentElement.style.display = ''
})
