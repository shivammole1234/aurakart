// ============================================================================
// OFFICIAL BUYHATKE VERIFIED DEALS CONTROLLER - COUPONS.JS (EXACT IMAGE 3)
// ============================================================================

window.BH_COUPONS = {
  activeCategory: 'all',
  currentSort: 'new',
  isTesting: false,

  init() {
    this.renderVerifiedDeals();
    this.bindEvents();
  },

  renderVerifiedDeals(customList) {
    const container = document.getElementById('verified-deals-grid-container');
    if (!container) return;

    let deals = customList || window.BH_DATA.verifiedDeals;

    if (this.activeCategory !== 'all') {
      deals = deals.filter(d => d.category.toLowerCase() === this.activeCategory.toLowerCase());
    }

    let html = '';

    deals.forEach(d => {
      const origPriceHtml = d.originalPrice ? `<span class="deal-original-price">₹${d.originalPrice.toLocaleString('en-IN')}</span>` : '';
      const discHtml = d.discountText ? `<span class="deal-discount-percent">${d.discountText}</span>` : '';
      const badgeHtml = d.dealBadge ? `<span class="deal-tag-pill ${d.dealBadgeClass}">${d.dealBadge}</span>` : '';
      const ratingClass = d.rating >= 4.0 ? 'high-green' : '';

      html += `
        <div class="deal-product-card" onclick="window.BH_COUPONS.openDealInBrowser('${d.id}')" title="View deal on ${d.store}">
          <!-- Photo with floating store badge -->
          <div class="deal-card-img-wrap">
            <img src="${d.image}" alt="${d.title}" class="deal-card-img" loading="lazy">
            <div class="deal-store-floating-badge" title="${d.store}">
              <img src="${d.storeIcon}" alt="${d.store}">
            </div>
          </div>

          <!-- Product Details -->
          <div class="deal-card-body">
            <!-- Score Row (Rainbow Gauge + Rating Star Badge) -->
            <div class="deal-scores-row">
              <span class="deal-gauge-score">
                <span class="rainbow-gauge-arc"></span>
                <span>${d.gaugeScore}</span>
              </span>
              <span class="deal-rating-badge ${ratingClass}">
                <span>★</span>
                <span>${d.rating}</span>
              </span>
            </div>

            <!-- Product Title -->
            <div class="deal-item-title" title="${d.title}">
              ${d.title}
            </div>

            <!-- Prices Row -->
            <div class="deal-prices-row">
              <span class="deal-current-price">₹${d.price.toLocaleString('en-IN')}</span>
              ${origPriceHtml}
              ${discHtml}
            </div>

            <!-- Deal Tag (HOT DEAL, EPIC DEAL, etc.) -->
            ${badgeHtml}
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  },

  filterCategory(categoryName) {
    const chips = document.querySelectorAll('.deal-filter-chip[data-category]');
    chips.forEach(chip => {
      const cat = chip.getAttribute('data-category');
      if (cat === categoryName) {
        if (chip.classList.contains('selected')) {
          chip.classList.remove('selected');
          this.activeCategory = 'all';
        } else {
          chip.classList.add('selected');
          this.activeCategory = categoryName;
        }
      } else {
        chip.classList.remove('selected');
      }
    });

    this.renderVerifiedDeals();
    window.BH_APP.showToast(`Filtered deals: ${this.activeCategory === 'all' ? 'All Verified Deals' : this.activeCategory}`);
  },

  filterDealsByKeyword(keyword) {
    const matches = window.BH_DATA.verifiedDeals.filter(d => 
      d.title.toLowerCase().includes(keyword) || 
      d.category.toLowerCase().includes(keyword) ||
      d.store.toLowerCase().includes(keyword)
    );

    if (matches.length > 0) {
      this.renderVerifiedDeals(matches);
      window.BH_APP.showToast(`Found ${matches.length} deals matching "${keyword}"!`);
    } else {
      this.renderVerifiedDeals();
    }
  },

  toggleSortDropdown() {
    const btn = document.getElementById('btn-deals-sort-dropdown');
    if (this.currentSort === 'new') {
      this.currentSort = 'discount';
      if (btn) btn.querySelector('span').textContent = 'Top Discounts';
      const sorted = [...window.BH_DATA.verifiedDeals].sort((a, b) => b.gaugeScore - a.gaugeScore);
      this.renderVerifiedDeals(sorted);
      window.BH_APP.showToast('Sorted by: Top Discounts & Score');
    } else {
      this.currentSort = 'new';
      if (btn) btn.querySelector('span').textContent = 'New Deals';
      this.renderVerifiedDeals();
      window.BH_APP.showToast('Sorted by: New Deals');
    }
  },

  openFilterModal() {
    window.BH_APP.showToast('⚙️ Filters applied: 40%+ Off, In Stock, Verified Stores (Myntra, Amazon, Flipkart)');
  },

  openDealInBrowser(dealId) {
    const deal = window.BH_DATA.verifiedDeals.find(d => d.id === dealId);
    if (!deal) return;

    window.BH_APP.showToast(`🚀 Opening "${deal.title.slice(0, 24)}..." on ${deal.store.toUpperCase()} Live Store...`);
    window.open(deal.url, '_blank');
    window.BH_APP.openInAppBrowser(deal.store, deal.url);
  },

  toggleCouponTesterDrawer() {
    this.runTester();
  },

  runTester() {
    if (this.isTesting) return;
    this.isTesting = true;

    const btn = document.getElementById('btn-run-coupon-bot');
    if (btn) btn.textContent = 'Testing 12 Codes...';

    window.BH_APP.showToast('🤖 Buyhatke Coupon Bot checking Myntra & Amazon bank discounts...');

    setTimeout(() => {
      this.isTesting = false;
      if (btn) btn.textContent = 'Test All ➔';
      window.BH_APP.showToast('🎉 Found coupon: MYNTRAHATKE saved an extra ₹150 on your order!');
    }, 1500);
  },

  bindEvents() {
    // Additional events if required
  }
};
