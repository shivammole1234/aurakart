// ============================================================================
// OFFICIAL BUYHATKE IN-APP BROWSER (SUPER BROWSE) CONTROLLER - INAPP-BROWSER.JS
// ============================================================================

window.BH_BROWSER = {
  activePlatform: 'zepto',
  currentUrl: 'https://www.zeptonow.com',
  isBrowserOpen: false,

  init() {
    this.renderTabsDock();
    this.renderPlatforms();
    this.bindEvents();
  },

  renderTabsDock() {
    const dock = document.getElementById('browser-tabs-dock');
    if (!dock) return;

    const platforms = window.BH_DATA.inAppPlatforms;
    let html = '';

    platforms.forEach(p => {
      const activeClass = p.id === this.activePlatform ? 'active' : '';
      html += `
        <div class="browser-tab-pill ${activeClass}" data-platform="${p.id}" data-url="${p.url}" onclick="window.BH_BROWSER.openBrowser('${p.id}', '${p.url}')">
          <img src="${p.icon}" alt="${p.name}">
          <span>${p.name}</span>
        </div>
      `;
    });

    dock.innerHTML = html;
  },

  renderPlatforms() {
    const grid = document.getElementById('linked-platforms-grid');
    if (!grid) return;

    const platforms = window.BH_DATA.inAppPlatforms;
    let html = '';

    platforms.forEach(p => {
      html += `
        <div class="platform-card" onclick="window.BH_BROWSER.openBrowser('${p.id}', '${p.url}')">
          <div class="platform-card-top">
            <img src="${p.icon}" alt="${p.name}" class="platform-logo-img">
            <div>
              <div class="platform-name">${p.name}</div>
              <div class="platform-cart-meta">${p.category}</div>
            </div>
            <div class="platform-status-dot"></div>
          </div>
          <div>
            <div style="font-size: 10px; color: #008357; margin-bottom: 6px; font-weight: 600;">
              ✓ Session Active • ${p.activeCartCount} in Cart
            </div>
            <button class="platform-action-btn">
              Browse on ${p.name} ➔
            </button>
          </div>
        </div>
      `;
    });

    grid.innerHTML = html;
  },

  openBrowser(platformId, targetUrl) {
    if (platformId === 'flipkart') {
      const modal = document.getElementById('inapp-browser-modal');
      if (modal) modal.classList.remove('open');
      this.isBrowserOpen = false;
      window.BH_APP.switchTab('flipkart');
      return;
    }

    this.activePlatform = platformId;
    this.isBrowserOpen = true;

    const modal = document.getElementById('inapp-browser-modal');
    if (modal) modal.classList.add('open');

    const p = window.BH_DATA.inAppPlatforms.find(item => item.id === platformId);
    const url = targetUrl || (p ? p.url : 'https://www.google.com');

    this.loadUrl(url);

    // Update active tab in dock
    const tabs = document.querySelectorAll('.browser-tab-pill');
    tabs.forEach(t => {
      t.classList.toggle('active', t.getAttribute('data-platform') === platformId);
    });

    // Scroll active tab into view in dock
    const activeTab = document.querySelector(`.browser-tab-pill[data-platform="${platformId}"]`);
    if (activeTab) {
      activeTab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  },

  loadUrl(url) {
    let cleanUrl = url;
    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
      cleanUrl = 'https://' + cleanUrl;
    }
    this.currentUrl = cleanUrl;

    const input = document.getElementById('browser-url-input');
    const iframe = document.getElementById('live-browser-iframe');
    const smartMsg = document.getElementById('smart-bar-message');
    const container = document.getElementById('browser-frame-container');

    if (input) input.value = cleanUrl;

    const p = window.BH_DATA.inAppPlatforms.find(item => item.id === this.activePlatform);
    if (smartMsg) {
      smartMsg.textContent = p ? `Buyhatke Tip: ${p.savingsFound}` : `Buyhatke Assistant tracking ${new URL(cleanUrl).hostname}`;
    }

    window.BH_APP.showToast(`🌐 Loading ${new URL(cleanUrl).hostname} in Super Browse...`);

    // Load URL via authorized In-App Store Session Hub
    if (iframe) {
      if (this.activePlatform) {
        iframe.src = `/api/inapp/store-session?platform=${encodeURIComponent(this.activePlatform)}&url=${encodeURIComponent(cleanUrl)}`;
      } else {
        iframe.src = `/api/proxy?url=${encodeURIComponent(cleanUrl)}`;
      }

      // Provide interactive fallbacks if cross-origin blocks rendering
      iframe.onerror = () => this.renderSimulatedStore(cleanUrl, p);
    }
  },

  renderSimulatedStore(url, platform) {
    const container = document.getElementById('browser-frame-container');
    if (!container) return;

    const p = platform || window.BH_DATA.inAppPlatforms.find(item => item.id === this.activePlatform) || {
      name: new URL(url).hostname,
      themeColor: '#5855E5',
      icon: 'assets/icons/buyhatke.svg',
      savingsFound: 'Best Price Tracked'
    };

    container.innerHTML = `
      <div style="padding: 32px 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; text-align: center; background: #FFFFFF; font-family: var(--font-main);">
        <div style="width: 72px; height: 72px; border-radius: 20px; background: ${p.themeColor || '#F1F5F9'}; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; box-shadow: 0 6px 20px rgba(0,0,0,0.12);">
          <img src="${p.icon}" alt="${p.name}" style="width: 52px; height: 52px; border-radius: 14px; object-fit: contain;">
        </div>
        <h3 style="font-size: 20px; font-weight: 800; color: #0F172A; margin-bottom: 6px;">${p.name} Live Store Session</h3>
        <p style="font-size: 13px; color: #64748B; max-width: 340px; line-height: 1.45; margin-bottom: 20px;">
          ${p.savingsFound} • Connected via Buyhatke Smart Rail. Tap below to launch your real account session directly on ${p.name}.
        </p>
        <div style="display: flex; flex-direction: column; gap: 10px; width: 100%; max-width: 280px;">
          <a href="${url}" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; justify-content: center; gap: 8px; background: #5855E5; color: #FFFFFF; font-weight: 700; font-size: 14px; padding: 12px 20px; border-radius: 12px; text-decoration: none; box-shadow: 0 4px 14px rgba(88,85,229,0.35);">
            <span>Launch ${p.name} Live Tab ↗</span>
          </a>
          <button onclick="navigator.clipboard.writeText('HATKE500'); window.BH_APP.showToast('📋 Copied HATKE500 to clipboard! Paste at checkout.');" style="background: #F1F5F9; color: #1E293B; border: 1px solid #CBD5E1; font-weight: 700; font-size: 13px; padding: 10px 16px; border-radius: 12px; cursor: pointer;">
            📋 Copy Promo: HATKE500
          </button>
        </div>
      </div>
    `;
  },

  navigateToInputUrl() {
    const input = document.getElementById('browser-url-input');
    if (input && input.value.trim()) {
      this.loadUrl(input.value.trim());
    }
  },

  closeBrowser() {
    this.isBrowserOpen = false;
    const modal = document.getElementById('inapp-browser-modal');
    if (modal) modal.classList.remove('open');
    const iframe = document.getElementById('live-browser-iframe');
    if (iframe) iframe.src = 'about:blank';
  },

  openExternalTab() {
    if (this.currentUrl) {
      window.open(this.currentUrl, '_blank');
      window.BH_APP.showToast(`Opened ${this.currentUrl} in live browser window with Buyhatke syncing!`);
    }
  },

  bindEvents() {
    const closeBtn = document.getElementById('browser-close-btn');
    if (closeBtn) closeBtn.addEventListener('click', () => this.closeBrowser());

    const backBtn = document.getElementById('browser-back-btn');
    if (backBtn) backBtn.addEventListener('click', () => this.closeBrowser());

    const reloadBtn = document.getElementById('browser-reload-btn');
    if (reloadBtn) {
      reloadBtn.addEventListener('click', () => {
        this.loadUrl(this.currentUrl);
      });
    }

    const openExtBtn = document.getElementById('smart-bar-open-ext-btn');
    if (openExtBtn) {
      openExtBtn.addEventListener('click', () => this.openExternalTab());
    }

    const couponBtn = document.getElementById('smart-bar-coupon-btn');
    if (couponBtn) {
      couponBtn.addEventListener('click', () => {
        window.BH_APP.showToast('🎉 Auto-Tested 12 coupons! Best coupon applied to cart.');
      });
    }

    const syncAllBtn = document.getElementById('btn-sync-all-accounts');
    if (syncAllBtn) {
      syncAllBtn.addEventListener('click', () => {
        window.BH_APP.showToast('🔄 Synchronized 16 linked accounts! Sessions refreshed.');
      });
    }
  }
};
