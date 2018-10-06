// ==UserScript==
// @name         MSDN 我告诉你 清爽特别版
// @namespace    https://greasyfork.org/zh-CN/scripts/370789
// @version      0.4
// @description  MSDN 我告诉你 去除广告, 界面宽度100%(解决默写内容太长看不到的问题), 去除捐赠提示
// @author       zhenhappy
// @match        http*://msdn.itellyou.cn/*
// @require      https://code.jquery.com/jquery-3.3.1.slim.min.js
// @require      https://raw.githubusercontent.com/zhenhappy/textarea/master/jquery-autoHeightTextarea.min.js
// ==/UserScript==

$(document).ready(() => {
  document.cookie = 'never_show_donate_auto=true;expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/'
  $('#view_data_container img').remove()
  $('.container').css('width', '100%')
  $('.panel-title a').css('text-decoration', 'none')
  $('.list-unstyled label, span.label, .panel').css('user-select', 'none')
  $('.list-unstyled label, span.label, .panel').css('-webkit-user-select', 'none')
  $('.list-unstyled label, span.label, .panel').css('-moz-user-select', 'none')
  $('.list-unstyled label, span.label, .panel').css('-ms-user-select', 'none')
  $(document).off('DOMSubtreeModified').on('DOMSubtreeModified', e => {
    const current = $(e.target)

    $('.list-unstyled label, span.label, .panel').css('user-select', 'none')
    $('.list-unstyled label, span.label, .panel').css('-webkit-user-select', 'none')
    $('.shang_box').remove()
    $('.detail > pre:nth-child(3)').remove()

    if (current.attr('class') === 'detail' && current.children('textarea').length > 0) return
    if (current.attr('class') === 'detail' && current.children('pre').length > 0) {
      current.children('textarea').remove()
      const textarea = document.createElement('textarea')
      textarea.minRows = '1'
      textarea.value = current.children('pre').text()
      textarea.style.width = '100%'
      textarea.style.padding = '10px 10px'
      textarea.style.fontSize = '14px'
      textarea.style.color = '#333'
      textarea.style.wordBreak = 'break-all'
      textarea.style.wordWrap = 'break-word'
      textarea.style.backgroundColor = '#f5f5f5'
      textarea.style.border = '1px solid #ccc'
      textarea.style.borderRadius = '4px'
      textarea.style.outline = 'none'
      textarea.style.resize = 'none'
      textarea.onclick = () => {
        textarea.select()
        document.execCommand("copy")
        console.log("复制成功")
      }
      current.append(textarea)
      $(textarea).autoHeightTextarea()
      current.children('pre').remove()
    }
  })
})
