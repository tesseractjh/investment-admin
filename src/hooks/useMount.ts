import { useState, useEffect } from 'react';

function useMount(callback: () => void, ...deps: unknown[]) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    callback();
  }, deps);

  return isMounted;
}

export default useMount;
