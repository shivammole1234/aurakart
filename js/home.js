// ============================================================================
// BUYHATKE HOME TAB CONTROLLER - HOME.JS (16 APPS SUPER BROWSE & EXACT UI)
// ============================================================================

window.BH_HOME = {
  init() {
    this.renderSuperBrowseApps();
    this.initSearch();
    this.bindEvents();
  },

  renderSuperBrowseApps() {
    const grid = document.getElementById('super-browse-apps-grid');
    if (!grid) return;

    const platforms = window.BH_DATA.inAppPlatforms;
    let html = '';

    platforms.forEach(app => {
      const badgeHtml = app.badge ? `<span class="app-cashback-badge">${app.badge}</span>` : '';
      const clickAction = app.id === 'flipkart' 
        ? "window.BH_APP.switchTab('flipkart')" 
        : `window.BH_APP.openInAppBrowser('${app.id}', '${app.url}')`;
      
      html += `
        <div class="super-app-box" onclick="${clickAction}" title="Open ${app.name} in Super Browse">
          <div class="app-icon-wrap" style="background: ${app.themeColor || '#1E293B'};">
            <img src="${app.icon}" alt="${app.name}" class="app-icon-img">
            ${badgeHtml}
          </div>
          <span class="app-name-label">${app.name}</span>
        </div>
      `;
    });

    grid.innerHTML = html;
  },

  initSearch() {
    const searchInput = document.getElementById('global-search-input');
    if (!searchInput) return;

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        if (!query) return;

        // Check if query is a direct URL
        if (query.includes('http://') || query.includes('https://') || query.includes('.com') || query.includes('.in')) {
          let targetUrl = query;
          if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
            targetUrl = 'https://' + targetUrl;
          }
          // If it's an e-commerce product link, route to Shopping scraper
          if (targetUrl.includes('amazon.') || targetUrl.includes('flipkart.') || targetUrl.includes('myntra.') || targetUrl.includes('croma.') || targetUrl.includes('/dp/') || targetUrl.includes('/p/')) {
            window.BH_APP.switchTab('shopping');
            setTimeout(() => {
              if (window.BH_SHOPPING && window.BH_SHOPPING.searchProduct) {
                window.BH_SHOPPING.searchProduct(targetUrl);
              }
            }, 100);
            return;
          }
          window.BH_APP.openInAppBrowser('custom', targetUrl);
          return;
        }

        const lower = query.toLowerCase();
        const isGroceryQuery = [
          'milk', 'bread', 'oil', 'atta', 'grocer', 'onion', 'coke', 'maggi', 'egg', 
          'paneer', 'butter', 'curd', 'dahi', 'ghee', 'tomato', 'potato', 'aloo', 
          'rice', 'dal', 'tea', 'coffee', 'fruit', 'apple', 'banana', 'chips', 
          'salt', 'biscuit', 'detergent', 'surf excel', 'chocolat', 'zepto', 'blinkit', 'ondc'
        ].some(keyword => lower.includes(keyword));

        if (isGroceryQuery) {
          window.BH_APP.switchTab('grocery');
          setTimeout(() => {
            if (window.BH_GROCERY && window.BH_GROCERY.filterProducts) {
              window.BH_GROCERY.filterProducts(lower);
            }
          }, 100);
        } else if (lower.includes('cab') || lower.includes('uber') || lower.includes('ola') || lower.includes('rapido') || lower.includes('airport') || lower.includes('ride') || lower.includes('auto')) {
          window.BH_APP.switchTab('cabs');
        } else if (lower.includes('flight') || lower.includes('delhi') || lower.includes('mumbai') || lower.includes('goa') || lower.includes('air')) {
          window.BH_APP.switchTab('flights');
        } else if (lower.includes('shirt') || lower.includes('dress') || lower.includes('crop top') || lower.includes('tunic') || lower.includes('charger') || lower.includes('face wash') || lower.includes('deal')) {
          window.BH_APP.switchTab('coupons');
          setTimeout(() => {
            if (window.BH_COUPONS && window.BH_COUPONS.filterDealsByKeyword) {
              window.BH_COUPONS.filterDealsByKeyword(lower);
            }
          }, 100);
        } else if (lower.includes('spend') || lower.includes('lens') || lower.includes('track') || lower.includes('expense')) {
          window.BH_APP.switchTab('spend-lens');
        } else {
          window.BH_APP.switchTab('shopping');
          setTimeout(() => {
            if (window.BH_SHOPPING && window.BH_SHOPPING.searchProduct) {
              window.BH_SHOPPING.searchProduct(lower);
            }
          }, 100);
        }
      }
    });
  },

  triggerVoiceSearch() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-IN';
      recognition.interimResults = false;

      window.BH_APP.showToast('🎙️ Listening... Speak your search or product link');

      recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        const input = document.getElementById('global-search-input');
        if (input) {
          input.value = text;
          const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
          input.dispatchEvent(enterEvent);
        }
      };

      recognition.onerror = () => {
        window.BH_APP.showToast('⚠️ Microphone listening cancelled or unavailable.');
      };

      recognition.start();
    } else {
      window.BH_APP.showToast('🎙️ Voice Search simulated: Listening for "iPhone 16 Best Price"...');
      setTimeout(() => {
        const input = document.getElementById('global-search-input');
        if (input) input.value = 'iPhone 16';
        window.BH_APP.switchTab('shopping');
      }, 1200);
    }
  },

  triggerLensSearch() {
    window.BH_APP.showToast('📷 Visual Search: Scanning barcode & product photo for lowest price across 100+ stores...');
    setTimeout(() => {
      window.BH_APP.switchTab('coupons');
      window.BH_APP.showToast('🎯 Matched: CareDone Women Dress & Tommy Hilfiger Shirt (Verified Deals active!)');
    }, 1200);
  },

  openKnowMoreModal() {
    // Scroll smoothly to Super Browse card
    const target = document.getElementById('super-browse-hub');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.BH_APP.showToast('⚡ Super Browse: Tap any of the 16 linked apps to launch in-app browsing!');
    }
  },

  toggleAllServices() {
    window.BH_APP.showToast('🔍 Showing All Compare Engines: Cab Wars, Flights, Grocery, Price Graph, Spend Lens!');
    const grid = document.getElementById('compare-services-grid');
    if (grid) {
      grid.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  },

  bindEvents() {
    // Add any global event bindings for home view
  }
};
