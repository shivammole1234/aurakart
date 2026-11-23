// ============================================================================
// BUYHATKE MASTER APP CONTROLLER - APP.JS (EXACT 1:1 REPLICA & ALL INTERACTIONS)
// ============================================================================

window.BH_APP = {
  currentTab: 'home',
  currentLocation: 'Koramangala, Bengaluru',

  init() {
    this.bindGlobalEvents();
    this.updateClock();
    setInterval(() => this.updateClock(), 30000);

    // Initialize all modular controllers
    if (window.BH_AUTH) window.BH_AUTH.init();
    if (window.BH_HOME) window.BH_HOME.init();
    if (window.BH_GROCERY) window.BH_GROCERY.init();
    if (window.BH_CABS) window.BH_CABS.init();
    if (window.BH_FLIGHTS) window.BH_FLIGHTS.init();
    if (window.BH_SHOPPING) window.BH_SHOPPING.init();
    if (window.BH_BROWSER) window.BH_BROWSER.init();
    if (window.BH_COUPONS) window.BH_COUPONS.init();
    if (window.BH_SPEND) window.BH_SPEND.init();
    if (window.BH_FLIPKART) window.BH_FLIPKART.init();

    // Support direct tab routing via URL hash (e.g., http://localhost:3000/#grocery)
    const hash = window.location.hash.replace('#', '').trim();
    if (hash && document.getElementById(`view-${hash}`)) {
      this.switchTab(hash);
    } else {
      this.switchTab('home');
    }

    window.addEventListener('hashchange', () => {
      const newHash = window.location.hash.replace('#', '').trim();
      if (newHash && document.getElementById(`view-${newHash}`)) {
        this.switchTab(newHash);
      }
    });

    console.log('🚀 [BUYHATKE APP INITIALIZED] Master clone ready with exact UI & full working features.');
  },

  updateClock() {
    const clockEl = document.getElementById('status-bar-time');
    if (clockEl) {
      const now = new Date();
      let hours = now.getHours();
      let mins = now.getMinutes().toString().padStart(2, '0');
      clockEl.textContent = `${hours}:${mins}`;
    }
  },

  switchTab(tabName) {
    this.currentTab = tabName;

    // Hide all view sections
    const views = document.querySelectorAll('.app-view-tab');
    views.forEach(v => {
      v.style.display = 'none';
      v.classList.remove('active');
    });

    // Show targeted view
    const targetView = document.getElementById(`view-${tabName}`);
    if (targetView) {
      targetView.style.display = 'flex';
      targetView.classList.add('active');
    }

    // Floating Bottom Bar handling
    const mainBottomNav = document.getElementById('main-floating-bottom-nav');
    const statusBar = document.querySelector('.mobile-status-bar');
    const batteryNum = document.getElementById('status-battery-num');
    const appHeader = document.querySelector('.app-header');
    const announcementStrip = document.querySelector('.bh-announcement-strip');

    if (tabName === 'spend-lens') {
      // In Spend Lens: hide the main bottom nav (Spend Lens has its dedicated dock!)
      if (mainBottomNav) mainBottomNav.style.display = 'none';
      if (appHeader) appHeader.style.display = 'none';
      if (announcementStrip) announcementStrip.style.display = 'none';
      if (statusBar) {
        statusBar.style.background = '#022B1F';
        statusBar.style.color = '#FFFFFF';
      }
      if (batteryNum) batteryNum.textContent = '23';
    } else if (tabName === 'coupons') {
      // In Verified Deals: show main bottom nav with Deals active, hide general app header
      if (mainBottomNav) mainBottomNav.style.display = 'flex';
      if (appHeader) appHeader.style.display = 'none';
      if (announcementStrip) announcementStrip.style.display = 'none';
      if (statusBar) {
        statusBar.style.background = '#F8FAFC';
        statusBar.style.color = '#0F172A';
      }
      if (batteryNum) batteryNum.textContent = '24';
    } else if (tabName === 'home') {
      // In Home: show main bottom nav with Home active, hide general header so poster starts at top
      if (mainBottomNav) mainBottomNav.style.display = 'flex';
      if (appHeader) appHeader.style.display = 'none';
      if (announcementStrip) announcementStrip.style.display = 'none';
      if (statusBar) {
        statusBar.style.background = '#6BCBFF';
        statusBar.style.color = '#0F172A';
      }
      if (batteryNum) batteryNum.textContent = '25';
    } else if (tabName === 'grocery') {
      // In Grocery Compare: hide main bottom nav so Screen 1 displays its dedicated Buyhatke sticky action bar ("Start saving")
      if (mainBottomNav) mainBottomNav.style.display = 'none';
      if (appHeader) appHeader.style.display = 'none';
      if (announcementStrip) announcementStrip.style.display = 'none';
      if (statusBar) {
        statusBar.style.background = '#FFFFFF';
        statusBar.style.color = '#0F172A';
      }
      if (batteryNum) batteryNum.textContent = '25';
      if (window.BH_GROCERY) {
        window.BH_GROCERY.showHubView();
      }
    } else if (tabName === 'flipkart') {
      // Dedicated Flipkart Shopping Tab: custom branded header
      if (mainBottomNav) mainBottomNav.style.display = 'flex';
      if (appHeader) appHeader.style.display = 'none';
      if (announcementStrip) announcementStrip.style.display = 'none';
      if (statusBar) {
        statusBar.style.background = '#2874F0';
        statusBar.style.color = '#FFFFFF';
      }
      if (batteryNum) batteryNum.textContent = '25';
      if (window.BH_FLIPKART) {
        window.BH_FLIPKART.setMode('inapp');
      }
    } else {
      // Other service tabs (cabs, flights, shopping, inapp-browser): show regular header & main nav
      if (mainBottomNav) mainBottomNav.style.display = 'flex';
      if (appHeader) appHeader.style.display = 'flex';
      if (announcementStrip) announcementStrip.style.display = 'flex';
      if (statusBar) {
        statusBar.style.background = '#3B3A98';
        statusBar.style.color = '#FFFFFF';
      }
      if (batteryNum) batteryNum.textContent = '25';
    }

    // Update bottom nav bar active item
    const navItems = document.querySelectorAll('.nav-tab-item');
    navItems.forEach(item => {
      const itemTab = item.getAttribute('data-tab');
      item.classList.toggle('active', itemTab === tabName);
    });

    // Scroll to top
    const container = document.getElementById('app-scroll-container');
    if (container) container.scrollTop = 0;

    // Canvas render trigger for Shopping tab
    if (tabName === 'shopping' && window.BH_SHOPPING) {
      setTimeout(() => {
        const product = window.BH_DATA.products.find(p => p.id === window.BH_SHOPPING.currentProductId);
        if (product) window.BH_SHOPPING.drawPriceGraph(product);
      }, 50);
    }
  },

  openInAppBrowser(platformId, targetUrl) {
    if (window.BH_BROWSER) {
      window.BH_BROWSER.openBrowser(platformId, targetUrl);
    }
  },

  handleSearchNavClick() {
    this.switchTab('home');
    setTimeout(() => {
      const input = document.getElementById('global-search-input');
      if (input) {
        input.focus();
        input.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 150);
  },

  openAlertsModal() {
    const modal = document.getElementById('alerts-modal');
    if (modal) modal.style.display = 'flex';
  },

  closeAlertsModal() {
    const modal = document.getElementById('alerts-modal');
    if (modal) modal.style.display = 'none';
  },

  showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast-item';
    toast.textContent = message;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  },

  bindGlobalEvents() {
    // Bottom Nav item clicks
    const navItems = document.querySelectorAll('.nav-tab-item');
    navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        const tab = item.getAttribute('data-tab');
        if (tab === 'search') {
          this.handleSearchNavClick();
        } else if (tab === 'alerts') {
          this.openAlertsModal();
        } else if (tab === 'profile') {
          if (window.BH_AUTH) window.BH_AUTH.openAuthModal();
        } else if (tab) {
          this.switchTab(tab);
        }
      });
    });

    // Header User Avatar Button -> Auth Modal
    const avatarBtn = document.getElementById('header-user-avatar');
    if (avatarBtn) {
      avatarBtn.addEventListener('click', () => {
        if (window.BH_AUTH) window.BH_AUTH.openAuthModal();
      });
    }

    // Header Coins Badge
    const coinsBtn = document.getElementById('header-coins-badge');
    if (coinsBtn) {
      coinsBtn.addEventListener('click', () => {
        this.showToast('🪙 You have 350 Hatke Coins! Redeem for Amazon / Swiggy vouchers.');
      });
    }

    // Header Location Pill
    const locPill = document.getElementById('header-location-pill');
    if (locPill) {
      locPill.addEventListener('click', () => {
        const cities = ['Koramangala, Bengaluru', 'Indiranagar, Bengaluru', 'HSR Layout, Bengaluru', 'Cyber City, Gurugram', 'Bandra West, Mumbai', 'Connaught Place, New Delhi'];
        const currentIdx = cities.indexOf(this.currentLocation);
        const nextIdx = (currentIdx + 1) % cities.length;
        this.currentLocation = cities[nextIdx];
        const locText = document.getElementById('location-display-text');
        if (locText) locText.textContent = this.currentLocation;
        this.showToast(`📍 Location updated: ${this.currentLocation}`);
      });
    }
  }
};

// Auto-run on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.BH_APP.init();
});
