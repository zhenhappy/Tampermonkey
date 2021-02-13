// ==UserScript==
// @name         游戏年轮下载优化
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  游戏年轮自动对下载地址做超链接, 方便点击, 验证码和密码均支持点击复制到剪贴板, 遇到未评论的会自动评论
// @author       You
// @match        http*://www.bibgame.com/*
// @icon         https://www.bibgame.com/resources/img/favicon.ico
// @require      https://unpkg.com/jquery
// @require      https://unpkg.com/clipboard
// ==/UserScript==

(function() {
    var t = setInterval(function () {
        if ($('#chakan').html()) {
            var url, code, password
            $.each($('#chakan p'), function( index, value ) {
                if (/http/g.test($(this).text())) {
                    url = /(http.*?)\s/g.exec($(this).text())[1]
                    $('#chakan p').eq(0).html('链接：<a style="border: none;text-decoration: underline;" href="' + url + '" target="_blank">' + url + '</a>')
                }
                if (/提取码/g.test($(this).text())) {
                    code = /(\w+)/g.exec($(this).text())[1]
                    $('#chakan p').eq(0).html('链接：<a style="border: none;text-decoration: underline;" href="' + url + '#' + code + '" target="_blank">' + url + '</a>')
                    $(this).html('提取码：<span style="cursor: pointer;" id="code" data-clipboard-target="#code">'+code+'</span>')
                    new ClipboardJS('#code')
                }
                if (/解压密码/g.test($(this).text())) {
                    password = /解压密码：(.*?)$/g.exec($(this).text())[1]
                    $(this).html('解压密码：<span style="cursor: pointer;" id="password" data-clipboard-target="#password">'+password+'</span>')
                    new ClipboardJS('#password')
                }
                if (/发表评论后/g.test($(this).text())) {
                    console.log('发表评论后')
                    if ($('#pl-520am-f-saytext')) {
                        $('#pl-520am-f-saytext').val('感谢分享')
                        $('#pl-submit-btn-main').click()
                        window.location.reload()
                    }
                }
            })
            console.log('url:', url)
            console.log('code:', code)
            console.log('password:', password)

            clearInterval(t)
        }
    }, 500)

    //$('#chakan p').eq(0).html($('#chakan p').eq(0).text().replace(/(http.*?)\s/g, '<a href="$1">$1</a>'))
    // Your code here...
})();