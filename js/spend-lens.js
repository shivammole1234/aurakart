// ============================================================================
// OFFICIAL BUYHATKE SPEND LENS CONTROLLER - SPEND-LENS.JS (EXACT IMAGE 1)
// ============================================================================

window.BH_SPEND = {
  isConnected: false,
  activeView: 'total', // 'total', 'stores', 'goodies'

  init() {
    this.renderBreakdown();
  },

  handleConnectClick() {
    this.isConnected = true;
    window.BH_APP.showToast('🔗 Connecting all 16 shopping accounts... Session verified!');

    const introCard = document.getElementById('spend-lens-intro-card');
    const analyticsWrap = document.getElementById('spend-lens-analytics-wrap');

    if (analyticsWrap) {
      analyticsWrap.style.display = 'flex';
      analyticsWrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    const ctaBtn = document.getElementById('btn-connect-track-spend');
    if (ctaBtn) {
      ctaBtn.textContent = '✓ Accounts Connected & Synced';
      ctaBtn.style.background = '#10B981';
    }
  },

  showTotalSpend() {
    this.activeView = 'total';
    this.updateActiveNav('spend-btn-total');

    const analyticsWrap = document.getElementById('spend-lens-analytics-wrap');
    if (analyticsWrap) analyticsWrap.style.display = 'flex';

    window.BH_APP.showToast('📊 Total Spend: ₹24,650 spent, ₹4,890 (19.8%) saved with Buyhatke!');

    const target = document.querySelector('.lens-analytics-card');
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  },

  showStoreInsights() {
    this.activeView = 'stores';
    this.updateActiveNav('spend-btn-stores');

    const analyticsWrap = document.getElementById('spend-lens-analytics-wrap');
    if (analyticsWrap) analyticsWrap.style.display = 'flex';

    window.BH_APP.showToast('🏪 Store Insights: Analyzing spend across Amazon, Zepto, Blinkit & Uber');

    const target = document.getElementById('store-insights-heading');
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  },

  showGoodiesModal() {
    window.BH_APP.showToast('🎁 Buyhatke Goodies: 1 Reward Pending! You have 350 Hatke Coins ready to redeem.');
  },

  updateActiveNav(activeId) {
    const navItems = document.querySelectorAll('.spend-nav-item');
    navItems.forEach(item => {
      item.classList.toggle('active', item.id === activeId);
    });
  },

  renderBreakdown() {
    const data = window.BH_DATA.spendLens;
    if (!data) return;

    // 1. Categories List
    const catList = document.getElementById('spend-categories-list');
    if (catList) {
      let catHtml = '';
      data.categoryBreakdown.forEach(c => {
        catHtml += `
          <div class="lens-category-row">
            <div style="display: flex; align-items: center; gap: 10px;">
              <div style="width: 10px; height: 10px; border-radius: 50%; background: ${c.color};"></div>
              <div>
                <strong style="font-size: 13px; color: #fff;">${c.name} (${c.percentage}%)</strong>
                <div style="font-size: 11px; color: #94A3B8;">${c.apps}</div>
              </div>
            </div>
            <strong style="font-size: 14px; color: #D8F8BF;">₹${c.amount.toLocaleString('en-IN')}</strong>
          </div>
        `;
      });
      catList.innerHTML = catHtml;
    }

    // 2. Store Insights List
    const storeList = document.getElementById('spend-stores-list');
    if (storeList) {
      const storeData = [
        { name: 'Amazon India', spent: 14200, saved: 3200, orders: 4, icon: 'assets/icons/amazon.svg' },
        { name: 'Zepto 10-Min', spent: 5100, saved: 820, orders: 12, icon: 'assets/icons/zepto.svg' },
        { name: 'Blinkit', spent: 4100, saved: 610, orders: 9, icon: 'assets/icons/blinkit.svg' },
        { name: 'Uber Rides', spent: 3800, saved: 490, orders: 15, icon: 'assets/icons/uber.svg' },
        { name: 'Myntra Fashion', spent: 2239, saved: 510, orders: 1, icon: 'assets/icons/myntra.svg' }
      ];

      let storeHtml = '';
      storeData.forEach(s => {
        storeHtml += `
          <div class="lens-store-row">
            <div style="display: flex; align-items: center; gap: 10px;">
              <img src="${s.icon}" alt="${s.name}" style="width: 28px; height: 28px; border-radius: 6px;">
              <div>
                <strong style="font-size: 13px; color: #fff;">${s.name}</strong>
                <div style="font-size: 11px; color: #34D399;">Saved ₹${s.saved} • ${s.orders} Orders</div>
              </div>
            </div>
            <strong style="font-size: 14px; color: #FFFFFF;">₹${s.spent.toLocaleString('en-IN')}</strong>
          </div>
        `;
      });
      storeList.innerHTML = storeHtml;
    }
  }
};
