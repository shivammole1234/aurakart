export type StoreStatus = 'connected' | 'not_connected' | 'unavailable';

export interface StoreConfig {
  id: string;
  name: string;
  logo: string;
  themeColor: string;
  status: StoreStatus;
  url: string;
  unavailableText?: string;
  smsSenderId?: string;
  tagline?: string;
  deliveryEta?: string;
  isLinked?: boolean;
}

export interface GroceryStoreConnectorProps {
  initialStores?: StoreConfig[];
  onBack?: () => void;
  onStartSaving?: (connectedStoreIds: string[]) => void;
  onRefresh?: () => void;
}

export interface InAppStoreWebViewProps {
  store: StoreConfig;
  onClose: () => void;
  onAuthSuccess: (store: StoreConfig) => void;
}

export interface SuccessBottomSheetProps {
  store: StoreConfig;
  onDone: (store: StoreConfig) => void;
}
