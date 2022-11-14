import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import API from '@api/index';
import useMount from './useMount';

export default function useAuth() {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  const isMounted = useMount(() => setToken(window.localStorage.getItem('accessToken')));

  const { data, isFetching } = useQuery(['auth'], API.auth.auth, {
    enabled: !!token,
  });

  useEffect(() => {
    if (typeof data !== 'boolean') {
      return;
    }

    if (data) {
      router.push('/');
    } else {
      window.localStorage.removeItem('accessToken');
    }
  }, [data]);

  return !isMounted || isFetching || data;
}
