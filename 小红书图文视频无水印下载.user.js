// ==UserScript==
// @name         小红书图文视频无水印下载
// @namespace    https://greasyfork.org/zh-CN/scripts/583067
// @version      2026-06-17
// @description  为小红书网页版添加无水印下载按钮，点击可跳转至解析页面下载图文或视频
// @author       zhenhappy<q505507538@gmail.com>
// @match        https://www.xiaohongshu.com/*
// @icon         https://fe-video-qc.xhscdn.com/fe-platform/ed8fe781ce9e16c1bfac2cd962f0721edabe2e49.ico
// @grant        none
// @license      MIT
// @downloadURL https://update.greasyfork.org/scripts/583067/%E5%B0%8F%E7%BA%A2%E4%B9%A6%E5%9B%BE%E6%96%87%E8%A7%86%E9%A2%91%E6%97%A0%E6%B0%B4%E5%8D%B0%E4%B8%8B%E8%BD%BD.user.js
// @updateURL https://update.greasyfork.org/scripts/583067/%E5%B0%8F%E7%BA%A2%E4%B9%A6%E5%9B%BE%E6%96%87%E8%A7%86%E9%A2%91%E6%97%A0%E6%B0%B4%E5%8D%B0%E4%B8%8B%E8%BD%BD.meta.js
// ==/UserScript==

(function() {
    'use strict';

    const DOWNLOAD_FLAG = 'xhs-download-inserted';

    function buildDownloadButton() {
        const wrapper = document.createElement('div');
        wrapper.className = 'share-wrapper xhs-download-wrapper';
        wrapper.style.cursor = 'pointer';
        wrapper.style.display = 'flex';
        wrapper.style.alignItems = 'center';
        wrapper.style.justifyContent = 'center';
        wrapper.style.padding = '0 8px';
        wrapper.setAttribute('data-' + DOWNLOAD_FLAG, '1');

        wrapper.innerHTML = `
            <div class="share-icon-container" style="width: 24px; height: 24px;">
                <svg class="reds-icon share-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 3a1 1 0 0 1 1 1v8.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L11 12.586V4a1 1 0 0 1 1-1Zm-7 14a1 1 0 0 1 1 1h12a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1Z"></path>
                </svg>
            </div>
        `;

        wrapper.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const url = window.location.href.replace(
                'www.xiaohongshu.com',
                'www.xiaohongshu.day'
            );
            window.open(url, '_blank');
        });

        return wrapper;
    }

    function tryInsert() {
        // 页面可能同时存在多个 .buttons（如弹层、列表），逐个补齐
        const shareBtns = document.querySelectorAll('.buttons .share-wrapper');
        shareBtns.forEach((shareBtn) => {
            const parent = shareBtn.parentElement;
            if (parent.querySelector('.xhs-download-wrapper')) return;
            parent.appendChild(buildDownloadButton());
        });
        return shareBtns.length > 0;
    }

    // 仅在笔记详情页（/explore/xxx 或 /discovery/item/xxx）启用监听
    const DETAIL_RE = /^\/(explore|discovery\/item)\/[^/?#]+/;
    function isDetailPage() {
        return DETAIL_RE.test(location.pathname);
    }

    // 用 requestAnimationFrame 做帧同步合并，避免高频 mutation 造成卡顿
    let rafId = null;
    function scheduleInsert() {
        if (rafId !== null) return;
        rafId = requestAnimationFrame(() => {
            rafId = null;
            tryInsert();
        });
    }

    // 监听 DOM 变化（只在有节点新增/删除时触发，减少无谓计算）
    const observer = new MutationObserver((mutations) => {
        for (const m of mutations) {
            if (m.addedNodes.length || m.removedNodes.length) {
                scheduleInsert();
                return;
            }
        }
    });

    let observing = false;
    function syncObserver() {
        if (isDetailPage()) {
            if (!observing) {
                observer.observe(document.documentElement, { childList: true, subtree: true });
                observing = true;
            }
            scheduleInsert();
        } else if (observing) {
            observer.disconnect();
            observing = false;
        }
    }

    // 监听 SPA URL 变化（pushState/replaceState 不会触发 popstate，需 hook）
    ['pushState', 'replaceState'].forEach((type) => {
        const orig = history[type];
        history[type] = function (...args) {
            const ret = orig.apply(this, args);
            window.dispatchEvent(new Event('xhs-location-change'));
            return ret;
        };
    });
    window.addEventListener('popstate', () => {
        window.dispatchEvent(new Event('xhs-location-change'));
    });
    window.addEventListener('xhs-location-change', syncObserver);

    // 初次执行
    syncObserver();
})();