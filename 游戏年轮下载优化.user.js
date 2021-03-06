// ==UserScript==
// @name         游戏年轮下载优化
// @namespace    https://greasyfork.org/zh-CN/scripts/421664
// @version      0.7
// @author       zhenhappy<q505507538@gmail.com>
// @description  游戏年轮自动对下载地址做超链接, 方便点击, 验证码和密码均支持点击复制到剪贴板, 遇到未评论的会自动评论
// @icon         https://www.bibgame.com/resources/img/favicon.ico
// @match        http*://www.bibgame.com/*
// @require      https://unpkg.com/jquery/dist/jquery.slim.min.js
// @require      https://unpkg.com/clipboard/dist/clipboard.min.js
// ==/UserScript==

(function() {
    var t = setInterval(function () {
        if ($('.head_box').html()) {
            if ($('header').html()) {
                $('header > .hd_top, header > .nav_togg').remove()
                $('header').css ({
                    height: '80px'
                })
            }
            if ($('.ver_nav').html()) {
                $('.ver_nav').remove()
            }
        }
        if ($('.main_body').html()) {
            $('.main_body').css({
                paddingLeft: '0'
            })
            if ($('.vg_main').html()) {
                $('.vg_main').css({
                    paddingTop: '80px'
                })
            }
            if ($('.main_right').html()) {
                $('.main_right').remove()
            }
            if ($('.main_left').html()) {
                if ($('.listad').html()) $('.listad').remove()
                $('.main_left').css({
                    width: '100%',
                    margin: '0 auto',
                    maxWidth: 'unset'
                })
                $('.main_left > .bread_crumb_nav').css({
                    width: '100%'
                })
                $('.main_left > .article').css({
                    width: '100%'
                })
                $('.front_content iframe').css({
                    maxWidth: '700px'
                })
            }
        }
        if ($('#chakan').html() && $('#pl-520am-f-saytext')) {
            try {
                var _url, url, _code, code, _password, password
                $.each($('#chakan p'), function( index, value ) {
                    _url = /(http.*?)\s/g.exec($(this).text())
                    if (_url && _url.length > 1) {
                        url = _url[1]
                        console.log('url:', url)
                        if (url) {
                            $('#chakan p').eq(0).html('链接：<a style="border: none;text-decoration: none;" href="' + url + '" target="_blank">' + url + '</a>')
                        }
                    }
                    _code = /提取码：(.+)/g.exec($(this).text())
                    if (_code && _code.length > 1) {
                        code = _code[1]
                        console.log('code:', code)
                        if (code) {
                            $('#chakan p').eq(0).html('链接：<a style="border: none;text-decoration: none;" href="' + url + '#' + code + '" target="_blank">' + url + '</a>')
                            $(this).html('提取码：<span style="cursor: pointer;" id="code" data-clipboard-target="#code">'+code+'</span>')
                            new ClipboardJS('#code')
                        }
                    }
                    _password = /解压密码：(.+)/g.exec($(this).text())
                    if (_password && _password.length > 1) {
                        password = _password[1]
                        console.log('password:', password)
                        if (password) {
                            $(this).html('解压密码：<span style="cursor: pointer;" id="password" data-clipboard-target="#password">'+password+'</span>')
                            new ClipboardJS('#password')
                        }
                    }
                    if (/发表评论后/g.test($(this).text())) {
                        console.log('发表评论后')
                        $('#pl-520am-f-saytext').val('感谢分享')
                        $('#pl-submit-btn-main').click()
                        window.location.reload()
                    }
                })
            } catch (e) {
                console.error(e)
            } finally {
                clearInterval(t)
            }
        }
    }, 500)
})()