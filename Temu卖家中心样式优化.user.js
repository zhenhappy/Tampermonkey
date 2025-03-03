// ==UserScript==
// @name         Temu卖家中心样式优化
// @namespace    https://greasyfork.org/zh-CN/scripts/528600
// @version      0.2
// @license      MIT
// @description  优化Temu"卖家中心->备货单管理->发货单列表"每次打开都会弹窗的烦人问题
// @author       zhenhappy<q505507538@gmail.com>
// @match        https://seller.kuajingmaihuo.com/main/order-manager/shipping-list
// @icon         https://bstatic.cdnfe.com/static/files/sc/favicon.ico
// @require      https://unpkg.com/jquery/dist/jquery.slim.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    
    const MAX_RETRIES = 1000; // 最大重试次数
    const CHECK_INTERVAL = 100; // 检查间隔时间（毫秒）
    let retryCount = 0;
    
    const checkAndRemoveTooltip = () => {
        const tooltip = $('.PT_tooltip_5-111-0');
        if (tooltip.length > 0) {
            tooltip.remove();
            console.log('成功移除弹窗元素');
            return true;
        }
        return false;
    };
    
    const intervalId = setInterval(() => {
        retryCount++;
        
        if (checkAndRemoveTooltip() || retryCount >= MAX_RETRIES) {
            if (retryCount >= MAX_RETRIES) {
                console.log('达到最大重试次数，停止检查');
            }
            clearInterval(intervalId);
        }
    }, CHECK_INTERVAL);
})();