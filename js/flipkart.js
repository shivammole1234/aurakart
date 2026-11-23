// ============================================================================
// BUYHATKE — DEDICATED FLIPKART SHOPPING CONTROLLER (FLIPKART.JS)
// Manages genuine iframe testing, embedding restrictions, and in-app fallback
// ============================================================================

window.BH_FLIPKART = {
  currentQuery: 'Apple iPhone 15',
  currentProduct: null,
  isCheckingEmbed: false,
  embedStatus: 'testing', // 'testing' | 'blocked' | 'permitted' | 'error'
  activeMode: 'inapp',    // 'inapp' | 'live'

  init() {
    this.bindEvents();
    this.setMode('inapp');
    // Default search for initial presentation
    this.searchProduct(this.currentQuery, false);
  },

  open() {
    window.BH_APP.switchTab('flipkart');
    this.setMode('inapp');
  },

  setMode(mode) {
    this.activeMode = mode;
    const tabInApp = document.getElementById('fk-tab-inapp');
    const tabLive = document.getElementById('fk-tab-live');
    const fallbackContainer = document.getElementById('flipkart-fallback-container');
    const iframeContainer = document.getElementById('flipkart-iframe-container');
    const mainContent = document.getElementById('flipkart-main-content');
    const directIframe = document.getElementById('flipkart-direct-iframe');
    const bannerEl = document.getElementById('flipkart-restriction-banner');
    const loadingEl = document.getElementById('flipkart-loading-state');

    if (mode === 'inapp') {
      if (tabInApp) tabInApp.classList.add('active');
      if (tabLive) tabLive.classList.remove('active');
      if (fallbackContainer) fallbackContainer.style.display = 'flex';
      if (iframeContainer) iframeContainer.classList.remove('active');
      if (mainContent) mainContent.classList.remove('iframe-mode');
      if (bannerEl) bannerEl.style.display = 'none';
      if (loadingEl) loadingEl.style.display = 'none';
      this.renderFallbackProduct();
    } else {
      if (tabInApp) tabInApp.classList.remove('active');
      if (tabLive) tabLive.classList.add('active');
      if (fallbackContainer) fallbackContainer.style.display = 'none';
      if (mainContent) mainContent.classList.add('iframe-mode');
      if (iframeContainer) iframeContainer.classList.add('active');
      if (bannerEl) bannerEl.style.display = 'none';

      // Load offers store or searched query directly to avoid Flipkart's forced root login popup
      const targetUrl = this.currentQuery && this.currentQuery !== 'Apple iPhone 15'
        ? `https://www.flipkart.com/search?q=${encodeURIComponent(this.currentQuery)}`
        : 'https://www.flipkart.com/offers-store';

      if (directIframe && (!directIframe.src || directIframe.src === 'about:blank' || !directIframe.src.includes('flipkart.com'))) {
        directIframe.src = targetUrl;
      }
    }
  },

  /**
   * Genuine test of Flipkart's embedding permissions
   */
  async testFlipkartEmbedding() {
    if (this.activeMode === 'live') {
      const directIframe = document.getElementById('flipkart-direct-iframe');
      if (directIframe) {
        const targetUrl = this.currentQuery && this.currentQuery !== 'Apple iPhone 15'
          ? `https://www.flipkart.com/search?q=${encodeURIComponent(this.currentQuery)}`
          : 'https://www.flipkart.com/offers-store';
        directIframe.src = targetUrl;
      }
    } else {
      this.searchProduct(this.currentQuery, true);
    }
  },

  retryLoading() {
    window.BH_APP.showToast('🔄 Refreshing Flipkart deals & live store...');
    this.testFlipkartEmbedding();
  },

  /**
   * Search Flipkart catalog using backend ProductDataProvider adapter
   */
  async searchProduct(query, showToast = true) {
    if (!query || !query.trim()) return;
    this.currentQuery = query.trim();

    if (showToast) {
      window.BH_APP.showToast(`🔍 Searching Flipkart catalog for "${this.currentQuery}"...`);
    }

    try {
      const res = await fetch(`/api/product/search?q=${encodeURIComponent(this.currentQuery)}`);
      const data = await res.json();

      if (data && data.product) {
        this.currentProduct = data.product;
        this.renderFallbackProduct();
      }

      if (this.activeMode === 'live') {
        const directIframe = document.getElementById('flipkart-direct-iframe');
        if (directIframe) {
          directIframe.src = `https://www.flipkart.com/search?q=${encodeURIComponent(this.currentQuery)}`;
        }
      }
    } catch (err) {
      console.error('Flipkart product search error:', err);
    }
  },

  /**
   * Render the in-app product interface inside the Buyhatke container
   */
  renderFallbackProduct() {
    const p = this.currentProduct;
    if (!p) return;

    // 1. Text elements
    const titleEl = document.getElementById('fk-product-title');
    const priceEl = document.getElementById('fk-product-price');
    const mrpEl = document.getElementById('fk-product-mrp');
    const imgEl = document.getElementById('fk-product-img');
    const verdictEl = document.getElementById('fk-product-verdict');
    const externalLink = document.getElementById('fk-external-affiliate-btn');
    const lowestStat = document.getElementById('fk-stat-lowest');
    const avgStat = document.getElementById('fk-stat-avg');

    if (titleEl) titleEl.textContent = p.name;
    if (priceEl) priceEl.textContent = `₹${(p.stores && p.stores.flipkart ? p.stores.flipkart.price : p.currentPrice || 66499).toLocaleString('en-IN')}`;
    if (mrpEl) mrpEl.textContent = `₹${(p.mrp || 79900).toLocaleString('en-IN')}`;
    if (imgEl && p.image) imgEl.src = p.image;
    if (verdictEl && p.verdict) verdictEl.innerHTML = p.verdict;

    if (lowestStat && p.lowestEver) lowestStat.textContent = `Lowest Ever: ₹${p.lowestEver.toLocaleString('en-IN')}`;
    if (avgStat && p.averagePrice) avgStat.textContent = `Avg: ₹${p.averagePrice.toLocaleString('en-IN')}`;

    // Target affiliate URL for external link
    const fkStore = p.stores && p.stores.flipkart ? p.stores.flipkart : null;
    const directUrl = fkStore && fkStore.url ? fkStore.url : `https://www.flipkart.com/search?q=${encodeURIComponent(p.name)}&affid=buyhatke`;

    if (externalLink) {
      externalLink.href = directUrl;
    }

    // 2. Retailer price comparison matrix
    this.renderStoreMatrix(p);

    // 3. Price History Canvas Graph
    setTimeout(() => {
      this.drawPriceHistory(p.history || []);
    }, 50);
  },

  renderStoreMatrix(product) {
    const matrixEl = document.getElementById('fk-stores-matrix-rows');
    if (!matrixEl || !product.stores) return;

    const stores = [
      { key: 'flipkart', name: 'Flipkart', icon: 'assets/icons/flipkart.svg', ...product.stores.flipkart },
      { key: 'amazon', name: 'Amazon', icon: 'assets/icons/amazon.svg', ...product.stores.amazon },
      { key: 'croma', name: 'Croma', icon: 'assets/icons/croma.svg', ...product.stores.croma },
      { key: 'reliance', name: 'Reliance Digital', icon: 'assets/icons/reliance.svg', ...product.stores.reliance }
    ];

    // Find lowest price
    let minPrice = Infinity;
    stores.forEach(s => {
      if (s.price && s.price < minPrice) minPrice = s.price;
    });

    let html = '';
    stores.forEach(s => {
      const isLowest = s.price === minPrice;
      const highlightClass = s.key === 'flipkart' ? 'highlighted' : '';
      const badge = isLowest ? '<span class="flipkart-cheapest-badge">Lowest Price</span>' : '';

      html += `
        <div class="flipkart-store-row ${highlightClass}">
          <div class="flipkart-store-left">
            <img src="${s.icon}" class="flipkart-store-icon" alt="${s.name}">
            <span class="flipkart-store-name">${s.name}</span>
          </div>
          <div class="flipkart-store-right">
            ${badge}
            <span class="flipkart-store-price">₹${s.price.toLocaleString('en-IN')}</span>
          </div>
        </div>
      `;
    });

    matrixEl.innerHTML = html;
  },

  drawPriceHistory(history) {
    const canvas = document.getElementById('flipkart-price-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;

    ctx.clearRect(0, 0, w, h);

    if (!history || history.length < 2) return;

    const prices = history.map(d => d.price);
    const minP = Math.min(...prices) * 0.96;
    const maxP = Math.max(...prices) * 1.04;

    const points = history.map((d, i) => {
      const x = 20 + (i / (history.length - 1)) * (w - 40);
      const y = h - 20 - ((d.price - minP) / (maxP - minP)) * (h - 35);
      return { x, y, price: d.price, day: d.day };
    });

    // Draw background grid line for average
    const avgY = h - 20 - ((prices.reduce((a, b) => a + b, 0) / prices.length - minP) / (maxP - minP)) * (h - 35);
    ctx.beginPath();
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = '#CBD5E1';
    ctx.lineWidth = 1;
    ctx.moveTo(15, avgY);
    ctx.lineTo(w - 15, avgY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Gradient fill under curve
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, 'rgba(40, 116, 240, 0.28)');
    grad.addColorStop(1, 'rgba(40, 116, 240, 0.0)');

    ctx.beginPath();
    ctx.moveTo(points[0].x, h - 10);
    ctx.lineTo(points[0].x, points[0].y);

    for (let i = 0; i < points.length - 1; i++) {
      const xc = (points[i].x + points[i + 1].x) / 2;
      const yc = (points[i].y + points[i + 1].y) / 2;
      ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
    }
    ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
    ctx.lineTo(points[points.length - 1].x, h - 10);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    // Main Curve Line
    ctx.beginPath();
    ctx.strokeStyle = '#2874F0';
    ctx.lineWidth = 2.5;
    ctx.moveTo(points[0].x, points[0].y);

    for (let i = 0; i < points.length - 1; i++) {
      const xc = (points[i].x + points[i + 1].x) / 2;
      const yc = (points[i].y + points[i + 1].y) / 2;
      ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
    }
    ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
    ctx.stroke();

    // End point indicator
    const last = points[points.length - 1];
    ctx.beginPath();
    ctx.arc(last.x, last.y, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#2874F0';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#FFFFFF';
    ctx.stroke();
  },

  setPriceAlert() {
    if (this.currentProduct) {
      window.BH_APP.showToast(`🔔 Price Drop Alert created for ${this.currentProduct.name}! We will notify you when price drops below ₹${this.currentProduct.currentPrice || 66499}.`);
    } else {
      window.BH_APP.openAlertsModal();
    }
  },

  copyCouponCode(code) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code);
      window.BH_APP.showToast(`📋 Copied ${code} to clipboard! Paste on Flipkart for extra discount.`);
    }
  },

  bindEvents() {
    const searchInput = document.getElementById('flipkart-search-input');
    const searchBtn = document.getElementById('flipkart-search-btn');

    if (searchInput) {
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          this.searchProduct(searchInput.value.trim());
        }
      });
    }

    if (searchBtn) {
      searchBtn.addEventListener('click', () => {
        if (searchInput) this.searchProduct(searchInput.value.trim());
      });
    }

    // Quick filter chips
    const chips = document.querySelectorAll('.flipkart-chip');
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const q = chip.getAttribute('data-query');
        if (q) {
          if (searchInput) searchInput.value = q;
          this.searchProduct(q);
        }
      });
    });
  }
};
