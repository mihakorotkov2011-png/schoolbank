export interface Student {
  id: string;
  name: string;
  grade?: string;
}

export interface Transaction {
  id: string;
  type: 'incoming' | 'outgoing';
  amount: number;
  counterparty: string;
  date: string;
  description?: string;
}

export enum AppView {
  HOME = 'HOME',
  TRANSFER = 'TRANSFER',
  HISTORY = 'HISTORY',
  AI_ASSISTANT = 'AI_ASSISTANT',
  SETTINGS = 'SETTINGS'
}

// Telegram Web App Types
declare global {
  interface Window {
    Telegram: {
      WebApp: {
        ready: () => void;
        expand: () => void;
        close: () => void;
        initDataUnsafe: any;
        MainButton: {
          text: string;
          color: string;
          textColor: string;
          isVisible: boolean;
          isActive: boolean;
          show: () => void;
          hide: () => void;
          onClick: (callback: () => void) => void;
          offClick: (callback: () => void) => void;
        };
        // Add other properties as needed
      }
    }
  }
}
