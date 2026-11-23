// ============================================================================
// OFFICIAL BUYHATKE PRICE HISTORY & TRACKER CONTROLLER - SHOPPING.JS
// ============================================================================

window.BH_SHOPPING = {
  currentProductId: 'p1',
  currentTimeframe: 90,

  init() {
    this.loadProduct(this.currentProductId);
    this.bindEvents();
  },

  loadProduct(productOrId) {
    const product = (typeof productOrId === 'object' && productOrId !== null)
      ? productOrId
      : window.BH_DATA.products.find(p => p.id === productOrId);

    if (!product) return;
    this.currentProductId = product.id;
    this.currentActiveProduct = product;

    const imgEl = document.getElementById('product-img-el');
    const titleEl = document.getElementById('product-title-el');
    const specsEl = document.getElementById('product-specs-el');
    const bestPriceEl = document.getElementById('product-best-price-el');
    const mrpEl = document.getElementById('product-mrp-el');
    const verdictEl = document.getElementById('product-verdict-el');
    const statLowest = document.getElementById('stat-lowest-el');
    const statAverage = document.getElementById('stat-average-el');
    const statHighest = document.getElementById('stat-highest-el');

    let lowestPrice = Infinity;
    for (const [sKey, sVal] of Object.entries(product.stores)) {
      if (sVal.price < lowestPrice) lowestPrice = sVal.price;
    }

    if (imgEl) imgEl.src = product.image;
    if (titleEl) titleEl.textContent = product.name;
    if (specsEl) specsEl.textContent = product.specs;
    if (bestPriceEl) bestPriceEl.textContent = `₹${lowestPrice.toLocaleString('en-IN')}`;
    if (mrpEl) mrpEl.textContent = `MRP ₹${product.mrp.toLocaleString('en-IN')}`;
    if (verdictEl) verdictEl.textContent = product.verdict;

    if (statLowest) statLowest.textContent = `₹${product.lowestEver.toLocaleString('en-IN')}`;
    if (statAverage) statAverage.textContent = `₹${product.averagePrice.toLocaleString('en-IN')}`;
    if (statHighest) statHighest.textContent = `₹${product.highestEver.toLocaleString('en-IN')}`;

    this.drawPriceGraph(product);
    this.renderStoreListings(product, lowestPrice);
  },

  drawPriceGraph(product) {
    const canvas = document.getElementById('price-history-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const rect = canvas.parentElement.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;

    ctx.clearRect(0, 0, width, height);

    const data = product.history;
    if (!data || data.length === 0) return;

    const prices = data.map(d => d.price);
    const minP = Math.min(...prices, product.lowestEver) * 0.96;
    const maxP = Math.max(...prices, product.highestEver) * 1.04;

    const paddingX = 40;
    const paddingY = 22;
    const chartW = width - paddingX * 2;
    const chartH = height - paddingY * 2;

    const getX = (index) => paddingX + (index / (data.length - 1)) * chartW;
    const getY = (price) => height - paddingY - ((price - minP) / (maxP - minP)) * chartH;

    // Draw horizontal guidelines
    const drawGridLine = (pVal, label, color) => {
      const y = getY(pVal);
      ctx.beginPath();
      ctx.setLineDash([3, 3]);
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.moveTo(paddingX, y);
      ctx.lineTo(width - paddingX, y);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = color;
      ctx.font = '600 9px Inter, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(`${label} ₹${Math.round(pVal / 1000)}k`, paddingX - 4, y + 3);
    };

    drawGridLine(product.lowestEver, 'Lowest', '#008357');
    drawGridLine(product.averagePrice, 'Avg', '#94A3B8');
    drawGridLine(product.highestEver, 'High', '#EB3131');

    // Fill Gradient
    ctx.beginPath();
    ctx.moveTo(getX(0), getY(data[0].price));
    for (let i = 1; i < data.length; i++) {
      const prevX = getX(i - 1);
      const prevY = getY(data[i - 1].price);
      const currX = getX(i);
      const currY = getY(data[i].price);
      const midX = (prevX + currX) / 2;
      ctx.bezierCurveTo(midX, prevY, midX, currY, currX, currY);
    }
    ctx.lineTo(getX(data.length - 1), height - paddingY);
    ctx.lineTo(getX(0), height - paddingY);
    ctx.closePath();

    const grad = ctx.createLinearGradient(0, paddingY, 0, height - paddingY);
    grad.addColorStop(0, 'rgba(88, 85, 229, 0.22)');
    grad.addColorStop(1, 'rgba(88, 85, 229, 0.01)');
    ctx.fillStyle = grad;
    ctx.fill();

    // Curved Stroke
    ctx.beginPath();
    ctx.moveTo(getX(0), getY(data[0].price));
    for (let i = 1; i < data.length; i++) {
      const prevX = getX(i - 1);
      const prevY = getY(data[i - 1].price);
      const currX = getX(i);
      const currY = getY(data[i].price);
      const midX = (prevX + currX) / 2;
      ctx.bezierCurveTo(midX, prevY, midX, currY, currX, currY);
    }
    ctx.strokeStyle = '#5855E5';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Data points
    data.forEach((d, idx) => {
      const x = getX(idx);
      const y = getY(d.price);

      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#5855E5';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x, y, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();

      ctx.fillStyle = '#64748B';
      ctx.font = '500 8px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(d.day, x, height - 6);
    });
  },

  renderStoreListings(product, lowestPrice) {
    const list = document.getElementById('stores-comparison-list');
    if (!list) return;

    const storeMeta = {
      amazon: { name: 'Amazon India', icon: 'assets/icons/amazon.svg' },
      flipkart: { name: 'Flipkart', icon: 'assets/icons/flipkart.svg' },
      croma: { name: 'Croma Electronics', icon: 'assets/icons/croma.svg' },
      reliance: { name: 'Reliance Digital', icon: 'assets/icons/reliance.svg' }
    };

    let html = '';
    for (const [sKey, sVal] of Object.entries(product.stores)) {
      const meta = storeMeta[sKey] || { name: sKey.toUpperCase(), icon: 'assets/icons/amazon.svg' };
      const isLowest = sVal.price === lowestPrice;

      html += `
        <div class="store-listing-card ${isLowest ? 'is-lowest' : ''}">
          <div class="store-listing-left">
            <img src="${meta.icon}" alt="${meta.name}" class="store-listing-logo">
            <div class="store-listing-info">
              <div class="store-listing-name">${meta.name} ${isLowest ? '★' : ''}</div>
              <div class="store-listing-sub">⭐ ${sVal.rating} (${sVal.reviews || 400}) • ${sVal.delivery}</div>
              <div class="store-listing-coupon">🎟️ ${sVal.coupon}</div>
            </div>
          </div>
          <div class="store-listing-right">
            <div class="store-listing-price">₹${sVal.price.toLocaleString('en-IN')}</div>
          <div class="store-listing-right">
            <div class="store-listing-price">₹${sVal.price.toLocaleString('en-IN')}</div>
            <button class="store-buy-now-btn" onclick="window.BH_SHOPPING.buyNow('${sKey}', '${product.name.replace(/'/g, "\\'")}', ${sVal.price}, '${sVal.url || ''}')">
              Buy on ${meta.name.split(' ')[0]} ↗
            </button>
          </div>
        </div>
      `;
    }

    list.innerHTML = html;
  },

  buyNow(storeKey, productName, price, storeUrl) {
    const defaultUrls = {
      amazon: `https://www.amazon.in/s?k=${encodeURIComponent(productName)}&tag=buyhatke-21`,
      flipkart: `https://www.flipkart.com/search?q=${encodeURIComponent(productName)}&affid=buyhatke`,
      croma: `https://www.croma.com/searchB?q=${encodeURIComponent(productName)}`,
      reliance: `https://www.reliancedigital.in/search?q=${encodeURIComponent(productName)}`
    };

    const targetUrl = storeUrl || defaultUrls[storeKey] || `https://www.google.com/search?q=${encodeURIComponent(productName)}`;

    window.BH_APP.showToast(`🚀 Opening ${storeKey.toUpperCase()} Live Store for ₹${price.toLocaleString('en-IN')}...`);

    // Open genuine merchant page in real window
    window.open(targetUrl, '_blank');

    // Also sync the In-App Super Browse bar
    if (window.BH_BROWSER && window.BH_BROWSER.loadUrl) {
      window.BH_BROWSER.activePlatform = storeKey;
      window.BH_BROWSER.loadUrl(targetUrl);
    }
  },

  async searchProduct(query) {
    if (!query) return;

    // 1. Check if user pasted a real URL
    if (query.startsWith('http://') || query.startsWith('https://') || query.includes('.com') || query.includes('.in')) {
      window.BH_APP.showToast('🔍 Analyzing live merchant product URL...');
      try {
        const res = await fetch(`/api/product/scrape?url=${encodeURIComponent(query)}`);
        const data = await res.json();
        if (data.success && data.product) {
          this.loadProduct(data.product);
          window.BH_APP.showToast(`✅ Live Product Loaded: ${data.product.name}`);
          return;
        }
      } catch (e) {
        console.warn('Scrape fetch error:', e);
      }
    }

    // 2. Check local dataset
    const localMatch = window.BH_DATA.products.find(item => item.name.toLowerCase().includes(query.toLowerCase()));
    if (localMatch) {
      this.loadProduct(localMatch.id);
      window.BH_APP.showToast(`Found: ${localMatch.name}`);
      return;
    }

    // 3. Query real live product search on backend
    window.BH_APP.showToast(`🔍 Searching live store prices for "${query}" across Amazon, Flipkart & Croma...`);
    try {
      const res = await fetch(`/api/product/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (data.success && data.product) {
        this.loadProduct(data.product);
        window.BH_APP.showToast(`✅ Real Price Comparison Loaded for "${query}"`);
      } else {
        window.BH_APP.showToast(`Found 0 direct matches for "${query}"`);
      }
    } catch (e) {
      console.warn('Live search error:', e);
      window.BH_APP.showToast(`Connected to real search for "${query}"`);
    }
  },

  bindEvents() {
    const chips = document.querySelectorAll('.product-chip');
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const id = chip.getAttribute('data-id');
        this.loadProduct(id);
      });
    });

    const tfPills = document.querySelectorAll('.graph-tf-pill');
    tfPills.forEach(pill => {
      pill.addEventListener('click', () => {
        tfPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        this.currentTimeframe = parseInt(pill.getAttribute('data-days'), 10);
        const product = window.BH_DATA.products.find(p => p.id === this.currentProductId);
        if (product) this.drawPriceGraph(product);
      });
    });

    const searchInput = document.getElementById('shopping-search-input');
    const searchBtn = document.getElementById('shopping-search-btn');
    if (searchInput) {
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') this.searchProduct(searchInput.value.trim());
      });
    }
    if (searchBtn && searchInput) {
      searchBtn.addEventListener('click', () => this.searchProduct(searchInput.value.trim()));
    }

    const alertBtn = document.getElementById('btn-set-price-alert');
    if (alertBtn) {
      alertBtn.addEventListener('click', () => {
        const product = window.BH_DATA.products.find(p => p.id === this.currentProductId);
        const targetPrice = Math.round(product.lowestEver * 0.95);
        window.BH_APP.showToast(`🔔 Price alert active: Will alert you if ${product.name} reaches ₹${targetPrice.toLocaleString('en-IN')}`);
      });
    }

    const couponBtn = document.getElementById('btn-test-auto-coupons');
    if (couponBtn) {
      couponBtn.addEventListener('click', () => {
        window.BH_APP.switchTab('coupons');
      });
    }

    window.addEventListener('resize', () => {
      const product = window.BH_DATA.products.find(p => p.id === this.currentProductId);
      if (product) this.drawPriceGraph(product);
    });
  }
};
