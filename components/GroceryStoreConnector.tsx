import React, { useState } from 'react';
import { StoreConfig, GroceryStoreConnectorProps } from './types';
import { InAppStoreWebView } from './InAppStoreWebView';

const DEFAULT_STORES: StoreConfig[] = [
  {
    id: 'dmart',
    name: 'DMart',
    logo: 'assets/icons/dmart.svg',
    themeColor: '#0E8A42',
    status: 'not_connected',
    url: 'https://www.dmart.in',
    tagline: 'Ready Pick-up',
    deliveryEta: 'Same day'
  },
  {
    id: 'zepto',
    name: 'Zepto',
    logo: 'assets/icons/zepto.svg',
    themeColor: '#751586',
    status: 'not_connected',
    url: 'https://www.zeptonow.com',
    deliveryEta: '8 mins'
  },
  {
    id: 'amazon_now',
    name: 'Amazon Now',
    logo: 'assets/icons/amazon_now.svg',
    themeColor: '#131921',
    status: 'not_connected',
    url: 'https://www.amazon.in/alm/storefront?almBrandId=VEEKT01TY0',
    deliveryEta: '2 hrs'
  },
  {
    id: 'jiomart',
    name: 'JioMart',
    logo: 'assets/icons/jiomart.svg',
    themeColor: '#E11D2A',
    status: 'not_connected',
    url: 'https://www.jiomart.com/customer/account/login',
    deliveryEta: 'Next day'
  },
  {
    id: 'bigbasket',
    name: 'BigBasket',
    logo: 'assets/icons/bigbasket.svg',
    themeColor: '#84CC16',
    status: 'not_connected',
    url: 'https://www.bigbasket.com',
    deliveryEta: '25 mins'
  },
  {
    id: 'blinkit',
    name: 'Blinkit',
    logo: 'assets/icons/blinkit.svg',
    themeColor: '#F8CB00',
    status: 'not_connected',
    url: 'https://blinkit.com',
    deliveryEta: '11 mins'
  }
];

export const GroceryStoreConnector: React.FC<GroceryStoreConnectorProps> = ({
  initialStores = DEFAULT_STORES,
  onBack,
  onStartSaving,
  onRefresh
}) => {
  const [stores, setStores] = useState<StoreConfig[]>(initialStores);
  const [activeConnectingStore, setActiveConnectingStore] = useState<StoreConfig | null>(null);
  const [successStore, setSuccessStore] = useState<StoreConfig | null>(null);

  // Compute connected stores
  const connectedStores = stores.filter(s => s.status === 'connected');
  const connectedCount = connectedStores.length;

  const handleConnectClick = (store: StoreConfig) => {
    setActiveConnectingStore(store);
  };

  const handleInAppAuthSuccess = (store: StoreConfig) => {
    // 1. Close the webview
    setActiveConnectingStore(null);
    // 2. Open Screen 3 Post-Login Success Bottom Sheet
    setSuccessStore(store);
  };

  const handleSuccessDone = () => {
    if (successStore) {
      // 3. Clicking "Done" updates the store card on the grid to:
      // - Button turns into a green badge: "Connected ✓"
      setStores(prev =>
        prev.map(s => (s.id === successStore.id ? { ...s, status: 'connected', isLinked: true } : s))
      );
      setSuccessStore(null);
    }
  };

  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh();
    } else {
      // Gentle status refresh
      setStores(prev => [...prev]);
    }
  };

  const handleStartSaving = () => {
    if (onStartSaving) {
      onStartSaving(connectedStores.map(s => s.id));
    }
  };

  return (
    <div style={styles.container}>
      {/* ====================================================================
          SCREEN 1: STORE CONNECTION HUB
          ==================================================================== */}
      
      {/* 1. Header */}
      <header style={styles.header}>
        {/* Top Bar: Back arrow < | "Grocery compare" | Buyhatke-style brand badge */}
        <div style={styles.topBar}>
          <button
            onClick={onBack}
            style={styles.backBtn}
            title="Go back"
            aria-label="Back"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <span style={styles.headerTitle}>Grocery compare</span>

          <div style={styles.brandBadge}>
            <img
              src="assets/icons/buyhatke.svg"
              alt="Buyhatke"
              style={styles.brandIcon}
            />
            <span style={styles.brandBadgeText}>
              Buy<span>hatke</span>
            </span>
          </div>
        </div>

        {/* Title, Subtitle & Micro Status */}
        <div style={styles.heroTextSection}>
          <h1 style={styles.title}>Smart cart check prices for you</h1>
          <p style={styles.subtitle}>
            We compare prices across grocery stores to find the best deal
          </p>

          {/* Micro Status: Small badge showing connected store logos */}
          <div style={styles.microStatusBadge}>
            <div style={styles.microLogosRow}>
              {connectedStores.map(s => (
                <img
                  key={s.id}
                  src={s.logo}
                  alt={s.name}
                  style={styles.microLogoImg}
                />
              ))}
            </div>
            <span style={styles.microStatusText}>
              {connectedCount} {connectedCount === 1 ? 'store' : 'stores'} connected
            </span>
          </div>
        </div>
      </header>

      {/* 2. 6-Store Grid (2 columns x 3 rows) */}
      <div style={styles.gridSection}>
        <div style={styles.grid}>
          {stores.map(store => {
            const isUnavailable = store.status === 'unavailable';
            const isConnected = store.status === 'connected';

            return (
              <div
                key={store.id}
                style={{
                  ...styles.storeCard,
                  ...(isUnavailable ? styles.storeCardUnavailable : {}),
                }}
              >
                {/* Centered Store Logo */}
                <div style={styles.logoWrap}>
                  <img
                    src={store.logo}
                    alt={store.name}
                    style={{
                      ...styles.storeLogo,
                      opacity: isUnavailable ? 0.45 : 1,
                    }}
                  />
                </div>

                {/* Store Name & Meta */}
                <div style={styles.storeNameWrap}>
                  <span
                    style={{
                      ...styles.storeName,
                      color: isUnavailable ? '#94A3B8' : '#0F172A',
                    }}
                  >
                    {store.name}
                  </span>
                  {store.deliveryEta && !isUnavailable && (
                    <span style={styles.storeEta}>⚡ {store.deliveryEta}</span>
                  )}
                </div>

                {/* Card Action / State */}
                <div style={styles.cardActionArea}>
                  {isUnavailable ? (
                    <span style={styles.unavailableText}>
                      {store.unavailableText || 'Not available at your location'}
                    </span>
                  ) : isConnected ? (
                    <div style={styles.connectedBadge}>
                      Connected <span style={styles.checkIcon}>✓</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleConnectClick(store)}
                      style={styles.connectBtn}
                    >
                      Connect →
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Bottom Sticky Actions */}
      <footer style={styles.bottomStickyBar}>
        <button
          onClick={handleStartSaving}
          disabled={connectedCount === 0}
          style={{
            ...styles.primarySavingBtn,
            opacity: connectedCount === 0 ? 0.5 : 1,
            cursor: connectedCount === 0 ? 'not-allowed' : 'pointer',
          }}
        >
          <span>Start saving</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>

        <button onClick={handleRefresh} style={styles.refreshBtn}>
          🔄 Refresh
        </button>
      </footer>

      {/* ====================================================================
          SCREEN 2: REAL IN-APP CONTAINER WRAPPER
          ==================================================================== */}
      {activeConnectingStore && (
        <InAppStoreWebView
          store={activeConnectingStore}
          onClose={() => setActiveConnectingStore(null)}
          onAuthSuccess={handleInAppAuthSuccess}
        />
      )}

      {/* ====================================================================
          SCREEN 3: POST-LOGIN SUCCESS BOTTOM SHEET
          ==================================================================== */}
      {successStore && (
        <div style={styles.bottomSheetBackdrop} onClick={handleSuccessDone}>
          <div
            style={styles.bottomSheetCard}
            onClick={e => e.stopPropagation()}
          >
            {/* Sheet Handle */}
            <div style={styles.sheetHandle}></div>

            {/* Centered green circular checkmark icon ✓ */}
            <div style={styles.successCheckCircle}>
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            {/* Title */}
            <h2 style={styles.successTitle}>Successfully Logged In!</h2>

            {/* Body */}
            <p style={styles.successBody}>
              Your <strong>{successStore.name}</strong> account has been linked successfully.
            </p>

            {/* Store Preview Pill */}
            <div style={styles.successStorePill}>
              <img src={successStore.logo} alt={successStore.name} style={styles.successStoreLogo} />
              <span>Real merchant credentials verified & synced</span>
            </div>

            {/* Solid blue "Done" button */}
            <button
              onClick={handleSuccessDone}
              style={styles.successDoneBtn}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
    backgroundColor: '#F8FAFC',
    color: '#0F172A',
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', 'Segoe UI', Roboto, sans-serif",
    position: 'relative',
    paddingBottom: '100px', // spacing for sticky footer
  },
  header: {
    padding: '16px 18px 8px',
    backgroundColor: '#FFFFFF',
    borderBottom: '1px solid #E2E8F0',
  },
  topBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '16px',
  },
  backBtn: {
    background: 'none',
    border: 'none',
    color: '#1E293B',
    cursor: 'pointer',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
  },
  headerTitle: {
    fontSize: '16px',
    fontWeight: 700,
    color: '#0F172A',
    letterSpacing: '-0.2px',
  },
  brandBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    backgroundColor: '#F1F5F9',
    padding: '4px 10px',
    borderRadius: '16px',
    border: '1px solid #E2E8F0',
  },
  brandIcon: {
    width: '18px',
    height: '18px',
  },
  brandBadgeText: {
    fontSize: '12px',
    fontWeight: 800,
    color: '#3B3A98',
  },
  heroTextSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    marginTop: '4px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 800,
    color: '#0F172A',
    lineHeight: 1.25,
    margin: 0,
    letterSpacing: '-0.5px',
  },
  subtitle: {
    fontSize: '13.5px',
    color: '#64748B',
    margin: 0,
    lineHeight: 1.45,
  },
  microStatusBadge: {
    alignSelf: 'flex-start',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#EFF6FF',
    border: '1px solid #BFDBFE',
    borderRadius: '20px',
    padding: '4px 10px',
    marginTop: '6px',
  },
  microLogosRow: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '2px',
  },
  microLogoImg: {
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    marginLeft: '-4px',
    border: '1.5px solid #FFFFFF',
    backgroundColor: '#FFFFFF',
    objectFit: 'contain',
  },
  microStatusText: {
    fontSize: '11px',
    fontWeight: 700,
    color: '#1D4ED8',
  },
  gridSection: {
    padding: '16px 16px 24px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px',
  },
  storeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: '16px',
    border: '1px solid #E2E8F0',
    padding: '18px 14px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: '168px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)',
    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
  },
  storeCardUnavailable: {
    backgroundColor: '#F8FAFC',
    borderColor: '#EDF2F7',
  },
  logoWrap: {
    width: '68px',
    height: '68px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '8px',
  },
  storeLogo: {
    width: '56px',
    height: '56px',
    borderRadius: '14px',
    objectFit: 'contain',
    boxShadow: '0 3px 8px rgba(0, 0, 0, 0.08)',
  },
  storeNameWrap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2px',
    marginBottom: '10px',
  },
  storeName: {
    fontSize: '14px',
    fontWeight: 700,
    textAlign: 'center',
  },
  storeEta: {
    fontSize: '11px',
    fontWeight: 600,
    color: '#16A34A',
  },
  cardActionArea: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  unavailableText: {
    fontSize: '11px',
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 1.3,
    padding: '0 4px',
  },
  connectedBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    backgroundColor: '#DCFCE7',
    color: '#15803D',
    border: '1px solid #86EFAC',
    borderRadius: '20px',
    padding: '6px 14px',
    fontSize: '12px',
    fontWeight: 700,
  },
  checkIcon: {
    fontSize: '12px',
    fontWeight: 900,
  },
  connectBtn: {
    width: '100%',
    backgroundColor: '#2563EB',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '10px',
    padding: '8px 12px',
    fontSize: '12.5px',
    fontWeight: 700,
    cursor: 'pointer',
    boxShadow: '0 2px 6px rgba(37, 99, 235, 0.25)',
    transition: 'background-color 0.15s ease',
  },
  bottomStickyBar: {
    position: 'sticky',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderTop: '1px solid #E2E8F0',
    padding: '12px 18px 16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    boxShadow: '0 -4px 16px rgba(0, 0, 0, 0.06)',
    zIndex: 90,
  },
  primarySavingBtn: {
    width: '100%',
    backgroundColor: '#4F46E5', // vibrant Buyhatke purple/blue
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '12px',
    height: '48px',
    fontSize: '15px',
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    boxShadow: '0 4px 14px rgba(79, 70, 229, 0.35)',
    transition: 'transform 0.12s ease',
  },
  refreshBtn: {
    background: 'none',
    border: 'none',
    color: '#64748B',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
    padding: '4px 8px',
  },
  bottomSheetBackdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    backdropFilter: 'blur(3px)',
    zIndex: 10000,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  bottomSheetCard: {
    width: '100%',
    maxWidth: '520px',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: '24px',
    borderTopRightRadius: '24px',
    padding: '20px 24px 32px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    boxShadow: '0 -10px 40px rgba(0, 0, 0, 0.25)',
    animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
  },
  sheetHandle: {
    width: '40px',
    height: '4px',
    borderRadius: '2px',
    backgroundColor: '#CBD5E1',
    marginBottom: '20px',
  },
  successCheckCircle: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    backgroundColor: '#16A34A',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '14px',
    boxShadow: '0 8px 24px rgba(22, 163, 74, 0.35)',
  },
  successTitle: {
    fontSize: '20px',
    fontWeight: 800,
    color: '#0F172A',
    margin: '0 0 8px 0',
    letterSpacing: '-0.4px',
  },
  successBody: {
    fontSize: '14.5px',
    color: '#475569',
    lineHeight: 1.5,
    margin: '0 0 16px 0',
  },
  successStorePill: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#F1F5F9',
    border: '1px solid #E2E8F0',
    borderRadius: '12px',
    padding: '6px 12px',
    fontSize: '12px',
    color: '#334155',
    fontWeight: 600,
    marginBottom: '22px',
  },
  successStoreLogo: {
    width: '20px',
    height: '20px',
    borderRadius: '6px',
    objectFit: 'contain',
  },
  successDoneBtn: {
    width: '100%',
    backgroundColor: '#2563EB',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '12px',
    height: '48px',
    fontSize: '15px',
    fontWeight: 700,
    cursor: 'pointer',
    boxShadow: '0 4px 14px rgba(37, 99, 235, 0.35)',
  },
};
