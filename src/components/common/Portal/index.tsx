import useMount from '@hooks/useMount';
import { useState } from 'react';
import ReactDOM from 'react-dom';

type Props = {
  children: React.ReactNode;
};

export default function Portal({ children }: Props) {
  const [root, setRoot] = useState<HTMLElement>();
  useMount(() => setRoot(document.getElementById('modal-root') as HTMLElement));

  if (!root) {
    return null;
  }

  return ReactDOM.createPortal(children, root);
}
