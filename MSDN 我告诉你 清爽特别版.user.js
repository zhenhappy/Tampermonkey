// ==UserScript==
// @name         MSDN 我告诉你 清爽特别版
// @namespace    https://greasyfork.org/zh-CN/scripts/370789
// @version      0.10
// @description  MSDN 我告诉你 去除广告, 界面宽度100%(解决SideBar里面的内容太长看不到的问题), 去除捐赠提示, 点击链接自动复制
// @author       zhenhappy
// @run-at       document-start
// @match        http*://msdn.itellyou.cn/*
// @require      https://code.jquery.com/jquery-3.3.1.slim.min.js
// ==/UserScript==

document.documentElement.style.display = 'none'

$(document).ready(() => {
  $.fn.autoHeightTextareaDefaults={rows:0,minRows:0,maxRows:null,HIDDEN_STYLE:"height:0 !important;visibility:hidden !important;overflow:hidden !important;position:absolute !important;z-index:-1000 !important;top:0 !important;right:0 !important;",CONTEXT_STYLE:["letter-spacing","line-height","padding-top","padding-bottom","font-family","font-weight","font-size","text-rendering","text-transform","width","text-indent","padding-left","padding-right","border-width","box-sizing"],calculateNodeStyling:function(targetElement){var _this=this,style=window.getComputedStyle(targetElement),boxSizing=style.getPropertyValue("box-sizing"),paddingSize=parseFloat(style.getPropertyValue("padding-bottom"))+parseFloat(style.getPropertyValue("padding-top")),borderSize=parseFloat(style.getPropertyValue("border-bottom-width"))+parseFloat(style.getPropertyValue("border-top-width")),contextStyle;return{contextStyle:this.CONTEXT_STYLE.map(function(value){return value+":"+style.getPropertyValue(value)}).join(";"),paddingSize:paddingSize,borderSize:borderSize,boxSizing:boxSizing}},mainAlgorithm:function(hiddenTextarea,textareaElement){var _this=this,{paddingSize:paddingSize,borderSize:borderSize,boxSizing:boxSizing,contextStyle:contextStyle}=this.calculateNodeStyling(textareaElement);hiddenTextarea.setAttribute("style",this.HIDDEN_STYLE+contextStyle),hiddenTextarea.value=textareaElement.value||textareaElement.placeholder||"";var height=hiddenTextarea.scrollHeight;"border-box"===boxSizing?height+=borderSize:"content-box"===boxSizing&&(height-=paddingSize),hiddenTextarea.value="";var singleRowHeight=hiddenTextarea.scrollHeight-paddingSize,minRows,dataRows=$(textareaElement).attr("rows"),dataMinRows=$(textareaElement).attr("data-min-rows");minRows=dataRows>0&&dataMinRows>0?Math.max(dataRows,dataMinRows):dataRows>0?dataRows:dataMinRows>0?dataMinRows:1;var maxRows=$(textareaElement).attr("data-max-rows")?$(textareaElement).attr("data-max-rows"):null;if(this.rows&&this.minRows?minRows=Math.max(this.rows,this.minRows,minRows):this.rows?minRows=Math.max(this.rows,minRows):this.minRows&&(minRows=Math.max(this.minRows,minRows)),this.maxRows&&null!==maxRows?maxRows=Math.min(this.maxRows,maxRows):this.maxRows&&(maxRows=this.maxRows),null!==minRows){var minHeight=singleRowHeight*minRows;"border-box"===boxSizing&&(minHeight=minHeight+paddingSize+borderSize),height=Math.max(minHeight,height)}if(null!==maxRows){var maxHeight=singleRowHeight*maxRows;"border-box"===boxSizing&&(maxHeight=maxHeight+paddingSize+borderSize),height=Math.min(maxHeight,height)}$(textareaElement).css("height",height+"px")}},$.fn.autoHeightTextarea=function(options){var options=$.extend({},$.fn.autoHeightTextareaDefaults,options);return this.each(function(index,textareaElement){var hiddenTextarea;hiddenTextarea||(hiddenTextarea=document.createElement("textarea"),document.body.appendChild(hiddenTextarea)),options.mainAlgorithm(hiddenTextarea,textareaElement),hiddenTextarea.parentNode&&hiddenTextarea.parentNode.removeChild(hiddenTextarea),hiddenTextarea=null,$(textareaElement).on("focus",function(){hiddenTextarea||(hiddenTextarea=document.createElement("textarea"),document.body.appendChild(hiddenTextarea),hiddenTextarea.setAttribute("style",options.HIDDEN_STYLE))}).on("input",function(){options.mainAlgorithm(hiddenTextarea,textareaElement)}).on("blur",function(){hiddenTextarea.parentNode&&hiddenTextarea.parentNode.removeChild(hiddenTextarea),hiddenTextarea=null})}),this}

  const userSelectStyle = {
    '-webkit-user-select': 'none',
    '-moz-user-select': 'none',
    '-ms-user-select': 'none',
    'user-select': 'none',
  }
  const textAreaStyle = {
    'width': '100%',
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
        textarea.minRows = '1'
        textarea.value = $(target).children('pre').text()
        $(textarea).css(textAreaStyle)
        textarea.onclick = () => {
          textarea.select()
          document.execCommand('copy')
          console.log('复制成功')
        }
        $(target).append(textarea)
        $(textarea).autoHeightTextarea()
        $(target).children('pre').remove()
      }
    }
  })
  document.documentElement.style.display = ''
})
