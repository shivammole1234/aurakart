import React, { useState } from 'react';
import { InAppStoreWebViewProps } from './types';

const authUrls: Record<string, string> = {
  'zepto': 'https://www.zeptonow.com',
  'blinkit': 'https://blinkit.com',
  'amazon': 'https://www.amazon.in/ap/signin?openid.pape.max_auth_age=0&openid.return_to=https%3A%2F%2Fwww.amazon.in%2F&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.assoc_handle=inflex&openid.mode=checkid_setup&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0',
  'amazon_now': 'https://www.amazon.in/ap/signin?openid.pape.max_auth_age=0&openid.return_to=https%3A%2F%2Fwww.amazon.in%2F&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.assoc_handle=inflex&openid.mode=checkid_setup&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0',
  'jiomart': 'https://www.jiomart.com/customer/account/login',
  'bigbasket': 'https://www.bigbasket.com',
  'dmart': 'https://www.dmart.in'
};

export const InAppStoreWebView: React.FC<InAppStoreWebViewProps> = ({
  store,
  onClose,
  onAuthSuccess,
}) => {
  const [isAwaitingVerification, setIsAwaitingVerification] = useState<boolean>(false);
  const [popupWindowRef, setPopupWindowRef] = useState<Window | null>(null);

  const storeKey = store.id.toLowerCase();
  const targetAuthUrl = authUrls[storeKey] || authUrls['amazon'] || store.url || 'https://www.zeptonow.com';

  const handleOpenMerchantLogin = () => {
    // Launch a centered authentication window pointing to the merchant's official login endpoint
    const popup = window.open(
      targetAuthUrl,
      '_blank',
      'width=500,height=700,top=100,left=300'
    );

    if (popup) {
      setPopupWindowRef(popup);
      try {
        popup.focus();
      } catch (e) {
        // window focus safe fallback
      }
    }

    setIsAwaitingVerification(true);
  };

  const handleCompleteLogin = () => {
    if (popupWindowRef && !popupWindowRef.closed) {
      try {
        popupWindowRef.close();
      } catch (e) {
        // window close safe fallback
      }
    }
    // Sets isLinked = true, closes modal and triggers success sheet
    onAuthSuccess({ ...store, isLinked: true });
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      style={styles.backdrop}
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-[#121418] border border-[#2A2F3A] rounded-2xl shadow-2xl overflow-hidden"
        style={styles.modalWindow}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div style={styles.headerBar}>
          <div style={styles.brandLeft}>
            <div style={styles.iconCircle}>
              <img src={store.logo} alt={store.name} style={styles.storeLogo} />
            </div>
            <div>
              <h3 style={styles.storeTitle}>{store.name}</h3>
              <span style={styles.railTag}>🔒 Official Merchant SSO Rail</span>
            </div>
          </div>
          <button
            onClick={onClose}
            style={styles.closeBtn}
            title="Close modal"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Modal Content */}
        <div style={styles.bodyContent}>
          {!isAwaitingVerification ? (
            /* ==========================================================
               STATE 1: INITIAL MERCHANT BRIDGE PROMPT
               ========================================================== */
            <div style={styles.stateWrapper}>
              {/* Status Row */}
              <div style={styles.statusPill}>
                <span style={styles.pulseDot} />
                <span style={styles.statusText}>Connecting to Official Merchant Rail</span>
              </div>

              {/* Subtext */}
              <p style={styles.subtext}>
                We will launch a secure authentication window to link your account. Enter your registered
                mobile number on the merchant page to receive your official verification OTP.
              </p>

              {/* Security Rail Box */}
              <div style={styles.securityBox}>
                <div style={styles.securityIcon}>🛡️</div>
                <div style={styles.securityTextWrap}>
                  <div style={styles.securityTitle}>Carrier SMS & Direct Session Sync</div>
                  <div style={styles.securityDesc}>
                    Buyhatke never intercepts your passwords or payment details. Your authentic account token
                    is synced directly via official merchant cookies.
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div style={styles.actionColumn}>
                <button
                  type="button"
                  onClick={handleOpenMerchantLogin}
                  className="bg-[#2563EB] text-white py-3 rounded-xl font-semibold w-full hover:bg-blue-600"
                  style={styles.primaryLoginBtn}
                >
                  Open Secure Merchant Login ↗
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  style={styles.cancelBtn}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            /* ==========================================================
               STATE 2: AWAITING VERIFICATION
               ========================================================== */
            <div style={styles.stateWrapper}>
              {/* Animated Spinner and Status */}
              <div style={styles.spinnerContainer}>
                <div style={styles.spinnerRing} />
                <div style={styles.awaitingTitle}>Authenticating on merchant rails...</div>
                <div style={styles.awaitingSub}>Complete login in the opened window.</div>
              </div>

              {/* Explanatory Box */}
              <div style={styles.awaitingDetailsBox}>
                <div style={styles.stepItem}>
                  <span style={styles.stepNum}>1</span>
                  <span>Enter your mobile number in the opened {store.name} window.</span>
                </div>
                <div style={styles.stepItem}>
                  <span style={styles.stepNum}>2</span>
                  <span>Verify using the official carrier SMS code sent to your phone.</span>
                </div>
                <div style={styles.stepItem}>
                  <span style={styles.stepNum}>3</span>
                  <span>Once logged in, click the confirmation button below.</span>
                </div>
              </div>

              {/* Actions */}
              <div style={styles.actionColumn}>
                <button
                  type="button"
                  onClick={handleCompleteLogin}
                  style={styles.completeLoginBtn}
                >
                  I have completed login ➔
                </button>

                <button
                  type="button"
                  onClick={handleOpenMerchantLogin}
                  style={styles.reopenBtn}
                >
                  🔄 Re-open Login Window ↗
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  style={styles.cancelBtn}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    backdropFilter: 'blur(8px)',
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px',
    animation: 'fadeIn 0.2s ease-out',
  },
  modalWindow: {
    width: '100%',
    maxWidth: '576px', // max-w-xl
    backgroundColor: '#121418',
    border: '1px solid #2A2F3A',
    borderRadius: '16px', // rounded-2xl
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.75)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', 'Segoe UI', Roboto, sans-serif",
    color: '#F8FAFC',
    animation: 'scaleIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  headerBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 24px',
    borderBottom: '1px solid #1E222B',
    backgroundColor: '#16191F',
  },
  brandLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
  },
  iconCircle: {
    width: '44px',
    height: '44px',
    borderRadius: '12px',
    backgroundColor: '#1E222B',
    border: '1px solid #2A2F3A',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '6px',
  },
  storeLogo: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  storeTitle: {
    fontSize: '18px',
    fontWeight: 800,
    color: '#FFFFFF',
    margin: 0,
    letterSpacing: '-0.3px',
  },
  railTag: {
    fontSize: '11px',
    color: '#38BDF8',
    fontWeight: 600,
    marginTop: '2px',
    display: 'inline-block',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    color: '#94A3B8',
    fontSize: '18px',
    fontWeight: 600,
    cursor: 'pointer',
    padding: '6px 10px',
    borderRadius: '8px',
    transition: 'color 0.15s ease',
  },
  bodyContent: {
    padding: '26px 28px 30px',
  },
  stateWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: '18px',
  },
  statusPill: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#0F172A',
    border: '1px solid #1E293B',
    borderRadius: '999px',
    padding: '6px 14px',
  },
  pulseDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#38BDF8',
    boxShadow: '0 0 8px #38BDF8',
  },
  statusText: {
    fontSize: '12.5px',
    fontWeight: 700,
    color: '#38BDF8',
  },
  subtext: {
    fontSize: '14px',
    color: '#94A3B8',
    lineHeight: 1.55,
    margin: 0,
    maxWidth: '460px',
  },
  securityBox: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    backgroundColor: '#16191F',
    border: '1px solid #232732',
    borderRadius: '12px',
    padding: '14px 16px',
    textAlign: 'left',
    width: '100%',
  },
  securityIcon: {
    fontSize: '22px',
    flexShrink: 0,
    marginTop: '2px',
  },
  securityTextWrap: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  securityTitle: {
    fontSize: '12.5px',
    fontWeight: 700,
    color: '#F1F5F9',
  },
  securityDesc: {
    fontSize: '11.5px',
    color: '#64748B',
    lineHeight: 1.45,
  },
  actionColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    width: '100%',
    marginTop: '6px',
  },
  primaryLoginBtn: {
    backgroundColor: '#2563EB',
    color: '#FFFFFF',
    padding: '13px 20px',
    borderRadius: '12px',
    fontWeight: 700,
    fontSize: '15px',
    width: '100%',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 4px 14px rgba(37, 99, 235, 0.4)',
    transition: 'background-color 0.15s ease',
  },
  cancelBtn: {
    background: 'none',
    border: 'none',
    color: '#64748B',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
    padding: '8px',
    transition: 'color 0.15s ease',
  },
  spinnerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    padding: '8px 0',
  },
  spinnerRing: {
    width: '42px',
    height: '42px',
    borderRadius: '50%',
    border: '3px solid rgba(56, 189, 248, 0.2)',
    borderTopColor: '#38BDF8',
    animation: 'spin 0.8s linear infinite',
  },
  awaitingTitle: {
    fontSize: '17px',
    fontWeight: 800,
    color: '#F8FAFC',
    letterSpacing: '-0.2px',
  },
  awaitingSub: {
    fontSize: '13.5px',
    color: '#94A3B8',
  },
  awaitingDetailsBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    backgroundColor: '#16191F',
    border: '1px solid #232732',
    borderRadius: '12px',
    padding: '14px 16px',
    width: '100%',
    textAlign: 'left',
  },
  stepItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '12.5px',
    color: '#CBD5E1',
    lineHeight: 1.4,
  },
  stepNum: {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    backgroundColor: '#1E293B',
    color: '#38BDF8',
    fontSize: '11px',
    fontWeight: 800,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  completeLoginBtn: {
    backgroundColor: '#16A34A',
    color: '#FFFFFF',
    padding: '13px 20px',
    borderRadius: '12px',
    fontWeight: 700,
    fontSize: '15px',
    width: '100%',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 4px 14px rgba(22, 163, 74, 0.4)',
    transition: 'background-color 0.15s ease',
  },
  reopenBtn: {
    backgroundColor: '#1E222B',
    color: '#CBD5E1',
    border: '1px solid #2A2F3A',
    padding: '10px 16px',
    borderRadius: '12px',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
    width: '100%',
    transition: 'background-color 0.15s ease',
  },
};
