// ==UserScript==
// @name         Temu卖家中心样式优化
// @namespace    https://greasyfork.org/zh-CN/scripts/528600
// @version      0.4
// @license      MIT
// @description  优化Temu"卖家中心->备货单管理->发货单列表"每次打开都会弹窗的烦人问题
// @author       zhenhappy<q505507538@gmail.com>
// @include      https://seller.kuajingmaihuo.com/*
// @icon         https://bstatic.cdnfe.com/static/files/sc/favicon.ico
// @require      https://unpkg.com/jquery/dist/jquery.slim.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const MAX_RETRIES = 1000; // 最大重试次数
    const CHECK_INTERVAL = 250; // 检查间隔时间（250ms）
    let retryCount = 0;
    let intervalId = null;
    let tooltipCheckerId = null;

    const checkAndRemoveTooltip = () => {
        const tooltip = $('.PT_tooltip_5-111-0');
        if (tooltip.length > 0) {
            tooltip.css({
                'display': 'none',
                'visibility': 'hidden',
                'opacity': '0',
                'pointer-events': 'none'
            });
            console.log('成功隐藏弹窗元素');
            return true;
        }
        return false;
    };

    const clearAllTimers = () => {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
        if (tooltipCheckerId) {
            clearInterval(tooltipCheckerId);
            tooltipCheckerId = null;
        }
    };

    const startChecking = () => {
        // 重置计数器
        retryCount = 0;

        // 清除所有定时器
        clearAllTimers();

        // 立即执行一次检测
        console.log('立即执行检测...');
        if (checkAndRemoveTooltip()) {
            console.log('首次检测成功移除弹窗');
            return;
        }

        // 启动新的定时器
        intervalId = setInterval(() => {
            retryCount++;

            if (checkAndRemoveTooltip() || retryCount >= MAX_RETRIES) {
                if (retryCount >= MAX_RETRIES) {
                    console.log('达到最大重试次数，停止检查');
                }
                clearInterval(intervalId);
                intervalId = null;
            }
        }, CHECK_INTERVAL);

        // 启动持续检查定时器
        tooltipCheckerId = setInterval(checkAndRemoveTooltip, CHECK_INTERVAL);
    };

    // 监听 URL 变化
    const checkURLChange = () => {
        let lastUrl = location.href;

        // 创建 MutationObserver 来监听 URL 变化
        const observer = new MutationObserver(() => {
            if (location.href !== lastUrl) {
                const wasInShippingList = lastUrl.includes('/main/order-manager/shipping-list');
                const isInShippingList = location.href.includes('/main/order-manager/shipping-list');
                lastUrl = location.href;

                if (isInShippingList) {
                    console.log('检测到进入发货单列表页面，开始检查弹窗');
                    startChecking();
                } else if (wasInShippingList) {
                    console.log('检测到离开发货单列表页面，停止检查');
                    clearAllTimers();
                }
            }
        });

        // 监听 document.body 的变化
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    };

    // 初始化
    if (location.href.includes('/main/order-manager/shipping-list')) {
        console.log('页面初始化，开始检查弹窗');
        startChecking();
    }
    checkURLChange();
})();