import { apiClient } from '@api/index';
import { AxiosError, AxiosResponse } from 'axios';
import { useRouter } from 'next/router';

function useAxiosInterceptors() {
  const router = useRouter();

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
        alert('서버와의 연결이 끊어졌습니다!');
        router.reload();
        return;
      }

      if (!error?.response) {
        return { error };
      }

      const { status }: AxiosResponse = error.response;
      if (status === 401 && router.pathname !== '/login') {
        router.push('/login');
        return;
      }

      return { error: error.response };
    }
  );
}

export default useAxiosInterceptors;
