// ============================================================================
// BUYHATKE FLIGHTS & TRAVEL CONTROLLER - FLIGHTS.JS
// Integrates In-App Flights Comparison (EaseMyTrip zero fee, MMT, Cleartrip),
// Passenger Booking, Seat Selection, Digital Boarding Pass with PNR,
// and Travel Bookings History.
// ============================================================================

window.BH_FLIGHTS = {
  currentSector: 'DEL-BOM',
  pendingFlightBooking: null,
  selectedSeat: '12A (Window)',

  init() {
    this.renderFlights();
    this.bindEvents();
    this.fetchBookingsCount();
  },

  async fetchBookingsCount() {
    try {
      const res = await fetch('/api/travel/bookings');
      const data = await res.json();
      if (data && data.success && Array.isArray(data.bookings)) {
        const countEl = document.getElementById('travel-bookings-nav-count');
        if (countEl) countEl.textContent = data.bookings.length;
      }
    } catch (e) {
      console.warn('Could not fetch travel bookings count:', e);
    }
  },

  renderFlights() {
    const container = document.getElementById('flights-list-container');
    if (!container) return;

    const sectorData = window.BH_DATA.flightRoutes.find(r => r.id === this.currentSector);
    if (!sectorData || !sectorData.flights) {
      container.innerHTML = '<div style="text-align:center; padding:30px; color:#94a3b8;">No flights found for this sector.</div>';
      return;
    }

    let html = '';
    sectorData.flights.forEach(flight => {
      const prices = flight.prices;
      
      // Calculate best price across portals
      let lowestPrice = Infinity;
      let lowestPortal = 'easemytrip';
      for (const [pKey, pVal] of Object.entries(prices)) {
        if (pVal.final < lowestPrice && pVal.final > 0) {
          lowestPrice = pVal.final;
          lowestPortal = pKey;
        }
      }

      html += `
        <div class="flight-ticket-card">
          <div class="flight-ticket-top">
            <div class="airline-badge">
              <img src="${flight.icon}" alt="${flight.airline}">
              <div>
                <div class="airline-name">${flight.airline}</div>
                <div class="flight-number-sub">${flight.flightNo} • Airbus A320</div>
              </div>
            </div>
            <span class="badge-pill-tag badge-cheapest">Lowest: ₹${lowestPrice.toLocaleString('en-IN')}</span>
          </div>

          <!-- Schedule Row -->
          <div class="flight-schedule-row">
            <div class="flight-time-col">
              <span class="flight-time">${flight.depTime}</span>
              <span class="flight-station">${sectorData.fromCode}</span>
            </div>
            <div class="flight-duration-col">
              <span class="duration-label">${flight.duration}</span>
              <div class="duration-line"></div>
              <span class="stops-label">${flight.stops}</span>
            </div>
            <div class="flight-time-col" style="align-items: flex-end;">
              <span class="flight-time">${flight.arrTime}</span>
              <span class="flight-station">${sectorData.toCode}</span>
            </div>
          </div>

          <!-- 4 Portals Side-by-Side Matrix -->
          <div class="flight-portal-matrix">
            <div class="portal-col ${lowestPortal === 'easemytrip' ? 'cheapest' : ''}">
              <img src="assets/icons/easemytrip.svg" class="portal-logo-mini" alt="EaseMyTrip">
              <span class="portal-name-sub">EaseMyTrip</span>
              <span class="portal-fare-price">₹${prices.easemytrip.final}</span>
              <span class="portal-promo-tag">-${prices.easemytrip.discount} code</span>
            </div>
            <div class="portal-col ${lowestPortal === 'makemytrip' ? 'cheapest' : ''}">
              <img src="assets/icons/makemytrip.svg" class="portal-logo-mini" alt="MakeMyTrip">
              <span class="portal-name-sub">MMT</span>
              <span class="portal-fare-price">₹${prices.makemytrip.final}</span>
              <span class="portal-promo-tag">-${prices.makemytrip.discount} code</span>
            </div>
            <div class="portal-col ${lowestPortal === 'cleartrip' ? 'cheapest' : ''}">
              <img src="assets/icons/cleartrip.svg" class="portal-logo-mini" alt="Cleartrip">
              <span class="portal-name-sub">Cleartrip</span>
              <span class="portal-fare-price">₹${prices.cleartrip.final}</span>
              <span class="portal-promo-tag">-${prices.cleartrip.discount} code</span>
            </div>
            <div class="portal-col ${lowestPortal === 'indigo' ? 'cheapest' : ''}">
              <img src="assets/icons/indigo.svg" class="portal-logo-mini" alt="IndiGo Direct">
              <span class="portal-name-sub">Airline Web</span>
              <span class="portal-fare-price">₹${prices.indigo.final}</span>
              <span class="portal-promo-tag">Direct</span>
            </div>
          </div>

          <div class="flight-book-action-row">
            <span class="lowest-deal-text">🎉 Best deal on ${lowestPortal.toUpperCase()} (Save ₹${prices.makemytrip.base - lowestPrice})</span>
            <button class="flight-select-btn" onclick="window.BH_FLIGHTS.bookFlight('${flight.flightNo}', '${lowestPortal}', ${lowestPrice})">
              Book on ${lowestPortal.toUpperCase()}
            </button>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  },

  // ==========================================================================
  // IN-APP FLIGHT PASSENGER BOOKING MODAL
  // ==========================================================================
  bookFlight(flightNo, portal, price) {
    const sectorData = window.BH_DATA.flightRoutes.find(r => r.id === this.currentSector) || { fromCode: 'DEL', toCode: 'BOM', flights: [] };
    const flight = sectorData.flights.find(f => f.flightNo === flightNo) || sectorData.flights[0];

    const portalNames = {
      easemytrip: 'EaseMyTrip (Zero Convenience Fee)',
      makemytrip: 'MakeMyTrip',
      cleartrip: 'Cleartrip',
      indigo: 'IndiGo Direct'
    };

    const baseFare = flight?.prices[portal]?.base || price + 400;
    const discount = flight?.prices[portal]?.discount || 400;

    this.pendingFlightBooking = {
      flightNo,
      portal,
      price,
      baseFare,
      discount,
      airline: flight?.airline || 'IndiGo',
      airlineIcon: flight?.icon || 'assets/icons/indigo.svg',
      fromCode: sectorData.fromCode,
      toCode: sectorData.toCode,
      depTime: flight?.depTime || '06:00',
      arrTime: flight?.arrTime || '08:15',
      duration: flight?.duration || '2h 15m'
    };

    // Pre-fill user information
    const user = window.BH_AUTH?.currentUser;
    const nameInput = document.getElementById('travel-passenger-name');
    const phoneInput = document.getElementById('travel-passenger-phone');
    const emailInput = document.getElementById('travel-passenger-email');

    if (nameInput) nameInput.value = user?.name || 'Hatke Traveler';
    if (phoneInput) phoneInput.value = user?.phone || '+91 98765 43210';
    if (emailInput) emailInput.value = 'traveler@buyhatke.com';

    // Populate flight strip
    const iconEl = document.getElementById('travel-strip-icon');
    const titleEl = document.getElementById('travel-modal-flight-title');
    const airlineNameEl = document.getElementById('travel-strip-airline-name');
    const portalTagEl = document.getElementById('travel-strip-portal-tag');
    const fromEl = document.getElementById('travel-strip-from');
    const toEl = document.getElementById('travel-strip-to');
    const durationEl = document.getElementById('travel-strip-duration');

    const baseFareEl = document.getElementById('travel-bill-base');
    const discountPortalNameEl = document.getElementById('travel-bill-portal-name');
    const discountEl = document.getElementById('travel-bill-discount');
    const totalEl = document.getElementById('travel-bill-total');

    if (iconEl) iconEl.src = this.pendingFlightBooking.airlineIcon;
    if (titleEl) titleEl.textContent = `Book ${this.pendingFlightBooking.airline} (${flightNo})`;
    if (airlineNameEl) airlineNameEl.textContent = `${this.pendingFlightBooking.airline} (${flightNo})`;
    if (portalTagEl) portalTagEl.textContent = portalNames[portal] || portal.toUpperCase();
    if (fromEl) fromEl.textContent = `${this.pendingFlightBooking.fromCode} (${this.pendingFlightBooking.depTime})`;
    if (toEl) toEl.textContent = `${this.pendingFlightBooking.toCode} (${this.pendingFlightBooking.arrTime})`;
    if (durationEl) durationEl.textContent = `${this.pendingFlightBooking.duration} (Non-stop)`;

    if (baseFareEl) baseFareEl.textContent = `₹${baseFare.toLocaleString('en-IN')}`;
    if (discountPortalNameEl) discountPortalNameEl.textContent = `${portal.toUpperCase()} Promo Discount`;
    if (discountEl) discountEl.textContent = `-₹${discount}`;
    if (totalEl) totalEl.textContent = `₹${price.toLocaleString('en-IN')}`;

    const modal = document.getElementById('travel-booking-modal');
    if (modal) modal.style.display = 'flex';
  },

  closeBookingModal() {
    const modal = document.getElementById('travel-booking-modal');
    if (modal) modal.style.display = 'none';
  },

  selectSeat(element, seatText) {
    this.selectedSeat = seatText;
    const chips = document.querySelectorAll('#travel-seat-selector .seat-chip');
    chips.forEach(c => c.classList.remove('active'));
    if (element) element.classList.add('active');
  },

  submitTravelBooking() {
    if (!this.pendingFlightBooking) return;

    let paymentMethod = 'UPI';
    const selectedRadio = document.querySelector('input[name="travel-payment-mode"]:checked');
    if (selectedRadio) paymentMethod = selectedRadio.value;

    if (paymentMethod === 'UPI') {
      const amountVal = this.pendingFlightBooking.price;
      this.closeBookingModal();

      if (window.BH_GROCERY && window.BH_GROCERY.openUpiModal) {
        window.BH_GROCERY.openUpiModal(amountVal, () => {
          this.executeTicketIssuance('UPI');
        });
      } else {
        this.executeTicketIssuance('UPI');
      }
    } else {
      this.closeBookingModal();
      this.executeTicketIssuance('CARD');
    }
  },

  async executeTicketIssuance(paymentMethod) {
    if (!this.pendingFlightBooking) return;

    const passengerName = document.getElementById('travel-passenger-name')?.value || 'Hatke Traveler';
    const passengerPhone = document.getElementById('travel-passenger-phone')?.value || '+91 98765 43210';
    const passengerEmail = document.getElementById('travel-passenger-email')?.value || 'traveler@buyhatke.com';

    window.BH_APP.showToast('✈️ Reserving your seat & generating boarding pass...');

    try {
      const response = await fetch('/api/travel/book-ticket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          flightNo: this.pendingFlightBooking.flightNo,
          portal: this.pendingFlightBooking.portal,
          airline: this.pendingFlightBooking.airline,
          airlineIcon: this.pendingFlightBooking.airlineIcon,
          fromCode: this.pendingFlightBooking.fromCode,
          toCode: this.pendingFlightBooking.toCode,
          depTime: this.pendingFlightBooking.depTime,
          arrTime: this.pendingFlightBooking.arrTime,
          duration: this.pendingFlightBooking.duration,
          fare: this.pendingFlightBooking.price,
          passengerName,
          passengerPhone,
          passengerEmail,
          seat: this.selectedSeat,
          paymentMethod
        })
      });

      const res = await response.json();
      if (res && res.success) {
        this.fetchBookingsCount();
        this.openTicketModal(res.booking);
        window.BH_APP.showToast(`🎉 Flight Ticket Confirmed! PNR: ${res.pnr}`);
      } else {
        alert('Booking failed: ' + (res.message || 'Could not connect to airline reservation system'));
      }
    } catch (e) {
      alert('Error booking ticket: ' + e.message);
    }
  },

  // ==========================================================================
  // DIGITAL BOARDING PASS & E-TICKET MODAL
  // ==========================================================================
  openTicketModal(booking) {
    if (!booking) return;

    const airlineEl = document.getElementById('bp-airline-name');
    const pnrEl = document.getElementById('bp-pnr-val');
    const fromCodeEl = document.getElementById('bp-from-code');
    const toCodeEl = document.getElementById('bp-to-code');
    const depTimeEl = document.getElementById('bp-dep-time');
    const arrTimeEl = document.getElementById('bp-arr-time');
    const fromCityEl = document.getElementById('bp-from-city');
    const toCityEl = document.getElementById('bp-to-city');
    const durationEl = document.getElementById('bp-duration-val');
    const passengerEl = document.getElementById('bp-passenger-val');
    const seatEl = document.getElementById('bp-seat-val');
    const gateEl = document.getElementById('bp-gate-val');
    const baggageEl = document.getElementById('bp-baggage-val');
    const barcodeEl = document.getElementById('bp-barcode-img');
    const bookingIdEl = document.getElementById('bp-booking-id');

    if (airlineEl) airlineEl.textContent = `${booking.airline} • ${booking.flightNo}`;
    if (pnrEl) pnrEl.textContent = booking.pnr;
    if (fromCodeEl) fromCodeEl.textContent = booking.fromCode;
    if (toCodeEl) toCodeEl.textContent = booking.toCode;
    if (depTimeEl) depTimeEl.textContent = booking.depTime;
    if (arrTimeEl) arrTimeEl.textContent = booking.arrTime;
    if (fromCityEl) fromCityEl.textContent = booking.fromCity;
    if (toCityEl) toCityEl.textContent = booking.toCity;
    if (durationEl) durationEl.textContent = booking.duration;
    if (passengerEl) passengerEl.textContent = booking.passengerName;
    if (seatEl) seatEl.textContent = booking.seat;
    if (gateEl) gateEl.textContent = booking.terminal || 'Terminal 3, Gate 14B';
    if (baggageEl) baggageEl.textContent = booking.baggage || '15 kg Check-in + 7 kg Cabin';
    if (bookingIdEl) bookingIdEl.textContent = `ID: ${booking.bookingId}`;

    if (barcodeEl) {
      barcodeEl.src = booking.barcodeUrl || `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=BOARDING_PASS_${booking.pnr}`;
    }

    const modal = document.getElementById('travel-ticket-modal');
    if (modal) modal.style.display = 'flex';
  },

  closeTicketModal() {
    const modal = document.getElementById('travel-ticket-modal');
    if (modal) modal.style.display = 'none';
  },

  // ==========================================================================
  // MY TRAVEL BOOKINGS HISTORY DRAWER
  // ==========================================================================
  async openTravelHistory() {
    const modal = document.getElementById('travel-history-modal');
    const container = document.getElementById('travel-bookings-history-list');
    if (!container) return;

    container.innerHTML = '<div style="text-align:center; padding:20px; color:#64748B;">Loading bookings...</div>';
    if (modal) modal.style.display = 'flex';

    try {
      const res = await fetch('/api/travel/bookings');
      const data = await res.json();

      if (!data || !data.bookings || data.bookings.length === 0) {
        container.innerHTML = `
          <div style="text-align:center; padding:30px 10px; color:#64748B;">
            <div style="font-size:36px; margin-bottom:8px;">✈️</div>
            <strong style="color:#0F172A; font-size:14px;">No Travel Bookings Yet</strong>
            <p style="font-size:11.5px; margin-top:4px;">Compare EaseMyTrip, MakeMyTrip & Cleartrip to get zero convenience fee tickets.</p>
          </div>
        `;
        return;
      }

      let html = '';
      data.bookings.forEach(b => {
        const dateStr = new Date(b.createdAt).toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          hour: '2-digit',
          minute: '2-digit'
        });

        html += `
          <div class="travel-history-item">
            <div class="travel-history-top">
              <span class="travel-history-pnr">PNR: ${b.pnr}</span>
              <span style="font-size:14px; font-weight:800; color:#0F172A;">₹${b.fare.toLocaleString('en-IN')}</span>
            </div>
            <div class="travel-history-sector">
              <span>${b.airline} (${b.flightNo}) • ${b.fromCode} ➔ ${b.toCode}</span>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; font-size:11px; color:#64748B; border-top:1px dashed #E2E8F0; padding-top:6px;">
              <span>Seat: <strong style="color:#0284C7;">${b.seat}</strong> • ${dateStr}</span>
              <button onclick='window.BH_FLIGHTS.openTicketModal(${JSON.stringify(b)})' style="background:#0284C7; color:#fff; border:none; border-radius:6px; padding:4px 10px; font-weight:700; cursor:pointer;">
                Boarding Pass ➔
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

  closeTravelHistory() {
    const modal = document.getElementById('travel-history-modal');
    if (modal) modal.style.display = 'none';
  },

  bindEvents() {
    const sectorPills = document.querySelectorAll('.flight-sector-pill');
    sectorPills.forEach(pill => {
      pill.addEventListener('click', () => {
        sectorPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        this.currentSector = pill.getAttribute('data-sector');

        const [from, to] = this.currentSector.split('-');
        const fromCodeEl = document.getElementById('flight-from-code');
        const toCodeEl = document.getElementById('flight-to-code');
        const fromNameEl = document.getElementById('flight-from-name');
        const toNameEl = document.getElementById('flight-to-name');

        if (fromCodeEl) fromCodeEl.textContent = from;
        if (toCodeEl) toCodeEl.textContent = to;

        const names = { DEL: 'New Delhi', BOM: 'Mumbai', BLR: 'Bengaluru', GOI: 'Goa' };
        if (fromNameEl) fromNameEl.textContent = names[from] || from;
        if (toNameEl) toNameEl.textContent = names[to] || to;

        this.renderFlights();
      });
    });

    const swapBtn = document.getElementById('swap-flight-cities-btn');
    if (swapBtn) {
      swapBtn.addEventListener('click', () => {
        const parts = this.currentSector.split('-');
        if (parts.length === 2) {
          this.currentSector = `${parts[1]}-${parts[0]}`;
          const fromCodeEl = document.getElementById('flight-from-code');
          const toCodeEl = document.getElementById('flight-to-code');
          if (fromCodeEl && toCodeEl) {
            const temp = fromCodeEl.textContent;
            fromCodeEl.textContent = toCodeEl.textContent;
            toCodeEl.textContent = temp;
          }
          this.renderFlights();
          window.BH_APP.showToast('Flight direction swapped');
        }
      });
    }
  }
};
