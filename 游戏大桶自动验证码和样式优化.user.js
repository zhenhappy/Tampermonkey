// ==UserScript==
// @name         游戏大桶自动验证码和样式优化
// @namespace    https://greasyfork.org/zh-CN/scripts/606205
// @version      1.2
// @description  游戏大桶搜索页自动通过加法验证码，并隐藏弹窗、调整导航等样式优化
// @author       You
// @match        https://www.gkinto.com/*
// @grant        none
// @run-at       document-start
// @license      MIT
// ==/UserScript==

(function () {
    'use strict';

    // --- 样式优化（替代 Stylus） ---
    const style = document.createElement('style');
    style.textContent = `
        .gamipress-daily-login-overlay,
        .gamipress-daily-login-popup,
        .sitetips.sitetips-default,
        #onesignal-slidedown-container {
            display: none !important;
        }

        .sub-menu {
            display: block !important;
        }

        .nav-main {
            margin-left: 25px !important;
        }

        #loginbox {
            transform: translateY(-50%) scale(2) !important;
        }
    `;
    (document.head || document.documentElement).appendChild(style);

    // --- 自动验证码 ---
    function solveCaptcha() {
        const captchaDiv = document.querySelector('.erphp-search-captcha');
        if (!captchaDiv) return false;

        const form = captchaDiv.querySelector('form');
        if (!form) return false;

        // 从 form 的文本中提取加法算式，例如 "44 + 36 ="
        const text = form.textContent || '';
        const match = text.match(/(\d+)\s*\+\s*(\d+)/);
        if (!match) {
            console.log('[自动验证码] 未找到加法算式:', text);
            return false;
        }

        const a = parseInt(match[1], 10);
        const b = parseInt(match[2], 10);
        const answer = a + b;

        console.log(`[自动验证码] ${a} + ${b} = ${answer}`);

        // 填入 input
        const input = form.querySelector('input[name="result"]');
        if (!input) return false;

        // 触发 React/框架兼容性事件
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
        nativeInputValueSetter.call(input, String(answer));
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));

        // 提交表单
        setTimeout(() => {
            form.submit();
            console.log('[自动验证码] 已提交');
        }, 100);

        return true;
    }

    // 初次尝试
    if (!solveCaptcha()) {
        // document-start 时 body 可能还没出，先等一下
        const root = document.body || document.documentElement;
        const observer = new MutationObserver(() => {
            if (solveCaptcha()) {
                observer.disconnect();
            }
        });
        observer.observe(root, { childList: true, subtree: true });

        // 最多等 15 秒，然后停止观察
        setTimeout(() => observer.disconnect(), 15000);
    }
})();
