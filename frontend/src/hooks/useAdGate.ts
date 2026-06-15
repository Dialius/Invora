import { useEffect } from 'react';
import { useAdGateStore } from '../store/adGate';

export const useAdGate = () => {
  const { isUnlocked, checkUnlockStatus, grantAccess } = useAdGateStore();

  useEffect(() => {
    checkUnlockStatus();
  }, []);

  return { isUnlocked, grantAccess };
};
