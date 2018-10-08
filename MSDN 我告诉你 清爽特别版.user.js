// ==UserScript==
// @name         MSDN 我告诉你 清爽特别版
// @namespace    https://greasyfork.org/zh-CN/scripts/370789
// @version      0.11
// @description  MSDN 我告诉你 去除广告, 界面宽度100%(解决SideBar里面的内容太长看不到的问题), 去除捐赠提示
// @author       zhenhappy
// @run-at       document-start
// @match        http*://msdn.itellyou.cn/*
// @require      https://unpkg.com/jquery/dist/jquery.slim.min.js
// @require      https://unpkg.com/autosize/dist/autosize.min.js
// ==/UserScript==

document.documentElement.style.display = 'none'

$(document).ready(() => {
  const userSelectStyle = {
    '-webkit-user-select': 'none',
    '-moz-user-select': 'none',
    '-ms-user-select': 'none',
    'user-select': 'none',
  }
  const textAreaStyle = {
    'width': '100%',
    'min-height': '40px',
    'padding': '10px',
    'font-size': '14px',
    'color': '#333',
    'word-break': 'break-all',
    'word-wrap': 'break-word',
    'background-color': '#f5f5f5',
    'border': '1px solid #ccc',
    'border-radius': '4px',
    'outline': 'none',
    'resize': 'none'
  }
  document.cookie = 'never_show_donate_auto=true;expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/'
  $('#view_data_container img').remove()
  $('.container').css('width', '100%')
  $('.panel-title a').css('text-decoration', 'none')
  $('.list-unstyled label, span.label, .panel').css(userSelectStyle)
  $(document).off('DOMSubtreeModified').on('DOMSubtreeModified', ({target}) => {
    $('.list-unstyled label, span.label, .panel').css(userSelectStyle)
    $('.shang_box').remove()
    $('.detail > pre:nth-child(3)').remove()
    if ($(target).attr('class') === 'detail') {
      if ($(target).children('textarea').length > 0) return
      else if ($(target).children('pre').length > 0) {
        $(target).children('textarea').remove()
        const textarea = document.createElement('textarea')
        textarea.rows = '1'
        textarea.value = $(target).children('pre').text()
        $(textarea).css(textAreaStyle)
        textarea.onclick = () => {
          textarea.select()
          document.execCommand('copy')
          console.log('复制成功')
        }
        $(target).append(textarea)
        autosize(textarea)
        $(target).children('pre').remove()
      }
    }
  })
  document.documentElement.style.display = ''
})
