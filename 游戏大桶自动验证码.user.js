// ==UserScript==
// @name         游戏大桶自动验证码
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  自动计算游戏大桶搜索页的加法验证码并提交
// @author       You
// @match        https://www.gkinto.com/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
    'use strict';

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
        // 如果验证码还没出现，用 MutationObserver 等待
        const observer = new MutationObserver(() => {
            if (solveCaptcha()) {
                observer.disconnect();
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });

        // 最多等 15 秒，然后停止观察
        setTimeout(() => observer.disconnect(), 15000);
    }
})();
