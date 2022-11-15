import { useContext } from 'react';
import { ModalContext } from '@contexts/ModalProvider';

export default function useModal() {
  const openModal = useContext(ModalContext);

  if (!openModal) {
    throw Error('Context is null');
  }

  return openModal;
}
