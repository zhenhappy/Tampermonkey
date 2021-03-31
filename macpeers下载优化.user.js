// ==UserScript==
// @name         macpeers优化
// @namespace    https://greasyfork.org/zh-CN/scripts/424268
// @version      0.2
// @description  macpeers自动对下载地址做超链接, 方便点击, 验证码和密码均支持点击复制到剪贴板
// @author       zhenhappy<q505507538@gmail.com>
// @icon         https://hkmacpeers-1259420093.file.myqcloud.com/favicon.ico
// @match        https://www.macpeers.net/*
// @require      https://unpkg.com/jquery/dist/jquery.slim.min.js
// @require      https://unpkg.com/clipboard/dist/clipboard.min.js
// ==/UserScript==

(function() {
    console.log('macpeers>>>>>>>>')
    var t = setInterval(function () {
        try {
            if ($('.post_content .STYLE2').length > 0) {
                var _url, url, _code, code, _password, password
                $.each($('.post_content .STYLE2'), function( index, value ) {
                    _url = /(http.*?)\s/g.exec($(this).text())
                    _code = /提取码\: (.+)/g.exec($(this).text())
                    _password = /解压密码：(.+)/g.exec($(this).text())
                    if (_url && _url.length > 1 && _code && _code.length > 1) {
                        url = _url[1]
                        console.log('url:', url)
                        code = _code[1]
                        console.log('code:', code)
                        if (code) {
                            $(this).html('链接: <a href="' + url + '#' + code + '" target="_blank" rel="nofollow noopener noreferrer">' + url + '</a> 提取码: <span style="cursor: pointer;" id="code" data-clipboard-target="#code">'+code+'</span>')
                            new ClipboardJS('#code')
                        }
                    }
                    if (_password && _password.length > 1) {
                        password = _password[1]
                        console.log('password:', password)
                        if (password) {
                            $(this).html('解压密码：<span style="cursor: pointer;" id="password" data-clipboard-target="#password">'+password+'</span>')
                            new ClipboardJS('#password')
                        }
                    }
                })
            } else throw(Error('未找到元素'))
            clearInterval(t)
            console.log('<<<<<<<<macpeers')
        } catch (e) {
            if ((e.message !== '未找到元素')) console.error('macpeers优化出错', e)
        }
    }, 500)
    console.log(t)
})()