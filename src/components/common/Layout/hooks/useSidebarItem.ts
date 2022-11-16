import { useRouter } from 'next/router';

export default function useSidebarItem(url: string, useClick?: () => () => void) {
  const router = useRouter();
  const onClick = useClick?.();
  const handleClick = () => {
    onClick?.();
    router.push(url);
  };

  return handleClick;
}
