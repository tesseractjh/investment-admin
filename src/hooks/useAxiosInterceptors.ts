import { useRouter } from 'next/router';
import type { AxiosError, AxiosResponse } from 'axios';
import { apiClient } from '@api/index';
import useModal from './useModal';

function useAxiosInterceptors() {
  const router = useRouter();
  const openModal = useModal();

  apiClient.interceptors.request.use((config) => {
    const accessToken = window.localStorage.getItem('accessToken');
    if (config.headers && accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  apiClient.interceptors.response.use(
    (res) => res,
    (error: AxiosError) => {
      if (error?.code === 'ERR_NETWORK') {
        openModal('서버와의 연결이 끊어졌습니다!', { onUnmount: () => router.reload() });
      }

      if (!error?.response) {
        return { error };
      }

      const { status }: AxiosResponse = error.response;
      if (status === 401 && router.pathname !== '/login') {
        openModal('세션이 만료되었습니다!', { onUnmount: () => router.push('/login') });
      }

      return { error: error.response };
    }
  );
}

export default useAxiosInterceptors;
