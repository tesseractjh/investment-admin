import { useQueryClient } from '@tanstack/react-query';
import { deleteCookie } from '@utils/cookie';

export default function useLogout() {
  const queryClient = useQueryClient();
  const handleLogout = () => {
    deleteCookie('accessToken');
    queryClient.clear();
  };

  return handleLogout;
}
