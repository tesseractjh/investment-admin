import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import API from '@api/index';
import { deleteCookie, getCookie } from '@utils/cookie';
import useMount from './useMount';
import useModal from './useModal';

export default function useAuth() {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  const openModal = useModal();
  const isMounted = useMount(() => setToken(getCookie('accessToken')));

  const { data, isFetching } = useQuery(['auth'], API.auth.auth, {
    enabled: !!token,
  });

  useEffect(() => {
    if (router.query.expired) {
      openModal('세션이 만료되었습니다!', {
        onUnmount: () => router.replace(router.pathname),
      });
    }
  }, [router.query]);

  useEffect(() => {
    if (typeof data !== 'boolean') {
      return;
    }

    if (data) {
      router.push('/');
    } else {
      deleteCookie('accessToken');
    }
  }, [data]);

  return !isMounted || isFetching || data;
}
