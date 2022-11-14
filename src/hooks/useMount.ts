import { useState, useEffect } from 'react';

function useMount(callback: () => void) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    callback();
  }, []);

  return isMounted;
}

export default useMount;
