import API from '@api/index';
import Logo from '@components/common/Logo';
import { useQuery } from '@tanstack/react-query';

export default function Home() {
  const { data, isLoading } = useQuery(['accounts'], () => API.account.getAccounts());

  if (isLoading || data?.error) {
    return null;
  }

  return (
    <div>
      <Logo />
    </div>
  );
}
