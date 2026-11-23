// ============================================================================
// BUYHATKE CABS & RIDE CONTROLLER - CABS.JS
// Integrates In-App Cab Wars, Interactive Ride Booking, Driver Matching,
// Start Ride OTP Verification, Live Progress Tracking & Ride History.
// ============================================================================

window.BH_CABS = {
  currentDistance: 38.5,
  currentDuration: 62,
  currentVehicleFilter: 'all',
  activeRideId: null,
  activeRideData: null,
  pendingBookingData: null,
  selectedTipAmount: 20,
  selectedRatingStars: 5,
  pollInterval: null,

  init() {
    this.renderRides();
    this.bindEvents();
    this.fetchRidesCount();
  },

  async fetchRidesCount() {
    try {
      const res = await fetch('/api/cabs/rides');
      const data = await res.json();
      if (data && data.success && Array.isArray(data.rides)) {
        const countEl = document.getElementById('cab-rides-nav-count');
        if (countEl) countEl.textContent = data.rides.length;
      }
    } catch (e) {
      console.warn('Could not fetch cab rides count:', e);
    }
  },

  renderRides() {
    const container = document.getElementById('cabs-list-container');
    if (!container) return;

    const providers = window.BH_DATA.cabProviders;
    const distance = this.currentDistance;

    // Flatten all options
    let allRides = [];
    providers.forEach(prov => {
      prov.options.forEach(opt => {
        if (this.currentVehicleFilter === 'all' || opt.type === this.currentVehicleFilter) {
          // Dynamic fare calculation
          const calculatedFare = Math.round(50 + (opt.basePerKm * distance * opt.surge));
          allRides.push({
            providerId: prov.id,
            providerName: prov.name,
            providerIcon: prov.icon,
            type: opt.type,
            label: opt.label,
            capacity: opt.capacity,
            eta: opt.eta,
            surge: opt.surge,
            iconEmoji: opt.icon,
            fare: calculatedFare
          });
        }
      });
    });

    // Sort by fare ascending
    allRides.sort((a, b) => a.fare - b.fare);

    if (allRides.length === 0) {
      container.innerHTML = '<div style="text-align:center; padding:30px; color:#94a3b8;">No rides found for this filter.</div>';
      return;
    }

    const lowestFare = allRides[0].fare;

    let html = '';
    allRides.forEach((ride) => {
      const isLowest = ride.fare === lowestFare;
      const surgeBadge = ride.surge > 1.0 
        ? `<span class="ride-tag-chip badge-surge">${ride.surge}x Surge</span>`
        : `<span class="ride-tag-chip badge-cheapest">Zero Surge</span>`;

      html += `
        <div class="ride-option-card ${isLowest ? 'cheapest-in-category' : ''}">
          <div class="ride-card-left">
            <div class="provider-logo-badge">
              <img src="${ride.providerIcon}" alt="${ride.providerName}">
              <span class="vehicle-type-emoji">${ride.iconEmoji}</span>
            </div>
            <div class="ride-meta-info">
              <div class="ride-title-row">
                <span class="ride-name">${ride.label}</span>
                ${surgeBadge}
                ${isLowest ? '<span class="ride-tag-chip badge-cheapest">Best Price</span>' : ''}
              </div>
              <div class="ride-details-sub">
                <span class="eta-tag">⚡ ${ride.eta} mins away</span>
                <span>• ${ride.capacity}</span>
                <span>• ${ride.providerName}</span>
              </div>
            </div>
          </div>
          <div class="ride-card-right">
            <div class="ride-fare-amount">₹${ride.fare}</div>
            <button class="ride-book-btn" onclick="window.BH_CABS.bookRide('${ride.providerId}', '${ride.label}', ${ride.fare})">
              Book on ${ride.providerName}
            </button>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  },

  // ==========================================================================
  // IN-APP RIDE BOOKING FLOW
  // ==========================================================================
  bookRide(providerId, rideLabel, fare) {
    const pickupInput = document.getElementById('cab-pickup-input');
    const dropInput = document.getElementById('cab-drop-input');
    const pickup = pickupInput ? pickupInput.value : 'Koramangala 4th Block, Bengaluru';
    const drop = dropInput ? dropInput.value : 'Kempegowda International Airport (BLR)';

    const discount = 45;
    const finalFare = Math.max(fare - discount, 50);

    this.pendingBookingData = {
      providerId,
      rideLabel,
      fare: finalFare,
      baseFare: fare,
      pickup,
      drop,
      distance: this.currentDistance,
      duration: this.currentDuration
    };

    const providerNames = {
      uber: 'Uber',
      ola: 'Ola Cabs',
      rapido: 'Rapido Auto/Moto',
      nammayatri: 'Namma Yatri (ONDC)'
    };

    // Populate modal fields
    const logoEl = document.getElementById('cab-booking-provider-logo');
    const titleEl = document.getElementById('cab-booking-modal-title');
    const pickupEl = document.getElementById('cab-booking-pickup-text');
    const dropEl = document.getElementById('cab-booking-drop-text');
    const distEl = document.getElementById('cab-booking-dist-text');
    const timeEl = document.getElementById('cab-booking-time-text');
    const etaEl = document.getElementById('cab-booking-eta-text');
    const typeEl = document.getElementById('cab-booking-vehicle-type');
    const baseFareEl = document.getElementById('cab-booking-base-fare');
    const totalFareEl = document.getElementById('cab-booking-total-fare');

    if (logoEl) logoEl.innerHTML = `<img src="assets/icons/${providerId}.svg" style="width:20px; height:20px; border-radius:4px;">`;
    if (titleEl) titleEl.textContent = `Confirm ${providerNames[providerId] || 'Ride'}`;
    if (pickupEl) pickupEl.textContent = pickup;
    if (dropEl) dropEl.textContent = drop;
    if (distEl) distEl.textContent = `${this.currentDistance} km`;
    if (timeEl) timeEl.textContent = `${this.currentDuration} mins`;
    if (etaEl) etaEl.textContent = 'Arriving in 3 mins';
    if (typeEl) typeEl.textContent = rideLabel;
    if (baseFareEl) baseFareEl.textContent = `₹${fare}`;
    if (totalFareEl) totalFareEl.textContent = `₹${finalFare}`;

    const modal = document.getElementById('cab-ride-booking-modal');
    if (modal) modal.style.display = 'flex';
  },

  closeBookingModal() {
    const modal = document.getElementById('cab-ride-booking-modal');
    if (modal) modal.style.display = 'none';
  },

  submitCabBooking() {
    if (!this.pendingBookingData) return;

    let paymentMode = 'UPI';
    const selectedRadio = document.querySelector('input[name="cab-payment-mode"]:checked');
    if (selectedRadio) paymentMode = selectedRadio.value;

    if (paymentMode === 'UPI') {
      const amountVal = this.pendingBookingData.fare;
      this.closeBookingModal();

      // Launch UPI Gateway simulator
      if (window.BH_GROCERY && window.BH_GROCERY.openUpiModal) {
        window.BH_GROCERY.openUpiModal(amountVal, () => {
          this.executeBookingApi('UPI');
        });
      } else {
        this.executeBookingApi('UPI');
      }
    } else {
      this.closeBookingModal();
      this.executeBookingApi('CASH');
    }
  },

  async executeBookingApi(paymentMode) {
    if (!this.pendingBookingData) return;

    window.BH_APP.showToast('🚕 Booking your ride with driver network...');

    try {
      const response = await fetch('/api/cabs/book-ride', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          providerId: this.pendingBookingData.providerId,
          rideLabel: this.pendingBookingData.rideLabel,
          pickup: this.pendingBookingData.pickup,
          drop: this.pendingBookingData.drop,
          distance: this.pendingBookingData.distance,
          duration: this.pendingBookingData.duration,
          fare: this.pendingBookingData.fare,
          paymentMode
        })
      });

      const res = await response.json();
      if (res && res.success) {
        this.activeRideId = res.rideId;
        this.activeRideData = res.ride;
        this.fetchRidesCount();
        this.openLiveRideModal(res.ride);
        window.BH_APP.showToast(`🎉 Driver Assigned! Start Ride OTP: ${res.startOtp}`);
      } else {
        alert('Booking failed: ' + (res.message || 'Could not connect to provider network'));
      }
    } catch (e) {
      alert('Error booking ride: ' + e.message);
    }
  },

  // ==========================================================================
  // LIVE RIDE TRACKING MODAL & STAGES
  // ==========================================================================
  openLiveRideModal(ride) {
    if (!ride) return;
    this.activeRideData = ride;
    this.activeRideId = ride.rideId;

    const titleEl = document.getElementById('cab-live-title');
    const otpEl = document.getElementById('cab-live-otp-display');
    const avatarEl = document.getElementById('cab-driver-avatar');
    const nameEl = document.getElementById('cab-driver-name');
    const ratingEl = document.getElementById('cab-driver-rating');
    const vehicleEl = document.getElementById('cab-driver-vehicle');
    const plateEl = document.getElementById('cab-driver-plate');
    const pickupEl = document.getElementById('cab-live-pickup-text');
    const dropEl = document.getElementById('cab-live-drop-text');

    if (titleEl) titleEl.textContent = `${ride.providerName} • ${ride.rideLabel}`;
    if (otpEl) otpEl.textContent = ride.startOtp || '8728';
    if (avatarEl) avatarEl.textContent = ride.providerId === 'rapido' || ride.providerId === 'nammayatri' ? '🛺' : '🚗';
    if (nameEl) nameEl.textContent = ride.driver?.name || 'Rajesh Murthy';
    if (ratingEl) ratingEl.textContent = ride.driver?.rating || '4.9 ★';
    if (vehicleEl) vehicleEl.textContent = ride.driver?.vehicle || 'Maruti Dzire White';
    if (plateEl) plateEl.textContent = ride.driver?.plate || 'KA-01-MJ-2918';
    if (pickupEl) pickupEl.textContent = ride.pickup;
    if (dropEl) dropEl.textContent = ride.drop;

    this.renderStages(ride.stages, ride.currentStage);

    const ratingBox = document.getElementById('cab-rating-container');
    const advBtn = document.getElementById('btn-advance-cab-stage');

    if (ride.currentStage === 'COMPLETED') {
      if (ratingBox) ratingBox.style.display = 'flex';
      if (advBtn) advBtn.style.display = 'none';
    } else {
      if (ratingBox) ratingBox.style.display = 'none';
      if (advBtn) advBtn.style.display = 'flex';
      this.startPolling();
    }

    const modal = document.getElementById('cab-live-ride-modal');
    if (modal) modal.style.display = 'flex';
  },

  closeLiveRideModal() {
    const modal = document.getElementById('cab-live-ride-modal');
    if (modal) modal.style.display = 'none';
    if (this.pollInterval) {
      clearInterval(this.pollInterval);
      this.pollInterval = null;
    }
  },

  renderStages(stages, currentStage) {
    const container = document.getElementById('cab-stages-timeline');
    if (!container || !stages) return;

    let html = '';
    stages.forEach((st, idx) => {
      const isDone = st.done;
      const isCurrent = st.key === currentStage;
      const iconContent = isDone ? '✓' : (idx + 1);

      html += `
        <div class="cab-stage-step ${isDone ? 'done' : ''} ${isCurrent ? 'current' : ''}">
          <div class="cab-step-icon">${iconContent}</div>
          <div class="cab-step-body">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span class="cab-step-title">${st.label}</span>
              <span style="font-size:10px; color:${isCurrent ? '#5855E5' : '#64748B'}; font-weight:${isCurrent ? '700' : '400'};">${st.time}</span>
            </div>
            <span class="cab-step-desc">${st.desc}</span>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  },

  startPolling() {
    if (this.pollInterval) clearInterval(this.pollInterval);
    this.pollInterval = setInterval(async () => {
      if (!this.activeRideId) return;
      try {
        const res = await fetch(`/api/cabs/ride/${this.activeRideId}/track`);
        const data = await res.json();
        if (data && data.success && data.ride) {
          this.activeRideData = data.ride;
          this.renderStages(data.ride.stages, data.ride.currentStage);
          if (data.ride.currentStage === 'COMPLETED') {
            clearInterval(this.pollInterval);
            this.pollInterval = null;
            const ratingBox = document.getElementById('cab-rating-container');
            const advBtn = document.getElementById('btn-advance-cab-stage');
            if (ratingBox) ratingBox.style.display = 'flex';
            if (advBtn) advBtn.style.display = 'none';
            window.BH_APP.showToast('🏁 Trip Completed! You have safely reached your destination.');
          }
        }
      } catch (e) {
        console.warn('Poll error:', e);
      }
    }, 5000);
  },

  async advanceRideStage() {
    if (!this.activeRideId) return;
    try {
      const response = await fetch(`/api/cabs/ride/${this.activeRideId}/advance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      if (data && data.success && data.ride) {
        this.activeRideData = data.ride;
        this.renderStages(data.ride.stages, data.ride.currentStage);

        if (data.ride.currentStage === 'COMPLETED') {
          if (this.pollInterval) clearInterval(this.pollInterval);
          const ratingBox = document.getElementById('cab-rating-container');
          const advBtn = document.getElementById('btn-advance-cab-stage');
          if (ratingBox) ratingBox.style.display = 'flex';
          if (advBtn) advBtn.style.display = 'none';
          window.BH_APP.showToast('🏁 Trip Completed! Rate your driver.');
        } else {
          window.BH_APP.showToast(`⚡ Ride Advanced to: ${data.currentStage}`);
        }
      }
    } catch (e) {
      alert('Advance error: ' + e.message);
    }
  },

  callDriver() {
    const driver = this.activeRideData?.driver;
    const name = driver?.name || 'Driver';
    const phone = driver?.phone || '+91 98451 98234';
    window.BH_APP.showToast(`📞 Dialing driver ${name} (${phone})...`);
  },

  selectStar(num) {
    this.selectedRatingStars = num;
    const stars = document.querySelectorAll('#cab-stars-selector .cab-star-icon');
    stars.forEach(st => {
      const sVal = parseInt(st.getAttribute('data-star'), 10);
      st.classList.toggle('active', sVal <= num);
    });
  },

  selectTip(amount, element) {
    this.selectedTipAmount = amount;
    const chips = document.querySelectorAll('.cab-tip-chip');
    chips.forEach(c => c.classList.remove('active'));
    if (element) element.classList.add('active');
  },

  async submitRating() {
    if (!this.activeRideId) return;
    try {
      await fetch(`/api/cabs/ride/${this.activeRideId}/rate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rating: this.selectedRatingStars,
          tip: this.selectedTipAmount
        })
      });
      window.BH_APP.showToast(`⭐ Rated ${this.selectedRatingStars} stars with ₹${this.selectedTipAmount} tip. Thank you!`);
      this.closeLiveRideModal();
    } catch (e) {
      this.closeLiveRideModal();
    }
  },

  // ==========================================================================
  // MY RIDES HISTORY DRAWER
  // ==========================================================================
  async openRidesHistory() {
    const modal = document.getElementById('cab-rides-history-modal');
    const container = document.getElementById('cab-rides-history-list');
    if (!container) return;

    container.innerHTML = '<div style="text-align:center; padding:20px; color:#64748B;">Loading rides...</div>';
    if (modal) modal.style.display = 'flex';

    try {
      const res = await fetch('/api/cabs/rides');
      const data = await res.json();

      if (!data || !data.rides || data.rides.length === 0) {
        container.innerHTML = `
          <div style="text-align:center; padding:30px 10px; color:#64748B;">
            <div style="font-size:36px; margin-bottom:8px;">🚕</div>
            <strong style="color:#0F172A; font-size:14px;">No Cab Rides Yet</strong>
            <p style="font-size:11.5px; margin-top:4px;">Compare Uber, Ola, Rapido and Namma Yatri to save up to 40% on every ride.</p>
          </div>
        `;
        return;
      }

      let html = '';
      data.rides.forEach(ride => {
        const dateStr = new Date(ride.createdAt).toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          hour: '2-digit',
          minute: '2-digit'
        });

        html += `
          <div class="cab-history-item">
            <div class="cab-history-top">
              <div style="display:flex; align-items:center; gap:8px;">
                <img src="${ride.providerIcon}" style="width:20px; height:20px; border-radius:4px;">
                <strong style="font-size:13px; color:#0F172A;">${ride.providerName} (${ride.rideLabel})</strong>
              </div>
              <span class="cab-history-fare">₹${ride.fare}</span>
            </div>
            <div class="cab-history-route">
              <div>📍 From: <strong>${ride.pickup}</strong></div>
              <div>🏁 To: <strong>${ride.drop}</strong></div>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; font-size:10.5px; color:#64748B; border-top:1px dashed #E2E8F0; padding-top:6px;">
              <span>${dateStr} • OTP: <strong style="color:#B45309;">${ride.startOtp}</strong></span>
              <button onclick='window.BH_CABS.openLiveRideModal(${JSON.stringify(ride)})' style="background:#5855E5; color:#fff; border:none; border-radius:6px; padding:4px 10px; font-weight:700; cursor:pointer;">
                ${ride.currentStage === 'COMPLETED' ? 'View Details' : 'Track Live ⚡'}
              </button>
            </div>
          </div>
        `;
      });

      container.innerHTML = html;
    } catch (e) {
      container.innerHTML = `<div style="text-align:center; padding:20px; color:#DC2626;">Error: ${e.message}</div>`;
    }
  },

  closeRidesHistory() {
    const modal = document.getElementById('cab-rides-history-modal');
    if (modal) modal.style.display = 'none';
  },

  bindEvents() {
    // Preset routes click
    const presetChips = document.querySelectorAll('.route-preset-chip');
    presetChips.forEach(chip => {
      chip.addEventListener('click', () => {
        presetChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');

        const routeId = chip.getAttribute('data-route');
        const routeData = window.BH_DATA.cabRoutes.find(r => r.id === routeId);
        if (routeData) {
          const pickupInput = document.getElementById('cab-pickup-input');
          const dropInput = document.getElementById('cab-drop-input');
          const distEl = document.getElementById('cab-distance-val');
          const timeEl = document.getElementById('cab-time-val');

          if (pickupInput) pickupInput.value = routeData.pickup;
          if (dropInput) dropInput.value = routeData.drop;
          if (distEl) distEl.textContent = `${routeData.distanceKm} km`;
          if (timeEl) timeEl.textContent = `${routeData.durationMins} mins`;

          this.currentDistance = routeData.distanceKm;
          this.currentDuration = routeData.durationMins;
          this.renderRides();
        }
      });
    });

    // Swap button
    const swapBtn = document.getElementById('swap-cab-route-btn');
    if (swapBtn) {
      swapBtn.addEventListener('click', () => {
        const pickupInput = document.getElementById('cab-pickup-input');
        const dropInput = document.getElementById('cab-drop-input');
        if (pickupInput && dropInput) {
          const temp = pickupInput.value;
          pickupInput.value = dropInput.value;
          dropInput.value = temp;
          this.renderRides();
          window.BH_APP.showToast('Route swapped');
        }
      });
    }

    // Vehicle category filters
    const vehicleFilters = document.querySelectorAll('.vehicle-filter-btn');
    vehicleFilters.forEach(btn => {
      btn.addEventListener('click', () => {
        vehicleFilters.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentVehicleFilter = btn.getAttribute('data-vehicle');
        this.renderRides();
      });
    });
  }
};
