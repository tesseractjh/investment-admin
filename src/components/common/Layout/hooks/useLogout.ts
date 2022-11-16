import { useQueryClient } from '@tanstack/react-query';

export default function useLogout() {
  const queryClient = useQueryClient();
  const handleLogout = () => {
    window.localStorage.removeItem('accessToken');
    queryClient.clear();
  };

  return handleLogout;
}
