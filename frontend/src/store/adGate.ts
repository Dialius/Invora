import { create } from 'zustand';

const STORAGE_KEY = 'invora_ad_unlocked_until';

interface AdGateState {
  isUnlocked: boolean;
  checkUnlockStatus: () => boolean;
  grantAccess: () => void;
  revokeAccess: () => void;
}

export const useAdGateStore = create<AdGateState>((set) => ({
  isUnlocked: (() => {
    const val = localStorage.getItem(STORAGE_KEY);
    return val ? Date.now() < parseInt(val, 10) : false;
  })(),

  checkUnlockStatus: () => {
    const val = localStorage.getItem(STORAGE_KEY);
    const unlocked = val ? Date.now() < parseInt(val, 10) : false;
    set({ isUnlocked: unlocked });
    return unlocked;
  },

  grantAccess: () => {
    const expiry = Date.now() + 24 * 60 * 60 * 1000; // +24 Jam
    localStorage.setItem(STORAGE_KEY, String(expiry));
    set({ isUnlocked: true });
  },

  revokeAccess: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({ isUnlocked: false });
  },
}));
