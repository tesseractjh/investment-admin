import React, { useState, useCallback, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import Portal from '@components/common/Portal';

type ModalOption = {
  onUnmount?: () => void;
  duration?: number;
};

type ModalContextValue = (message: string, option?: ModalOption) => void;

type Props = {
  children: React.ReactNode;
};

export const ModalContext = React.createContext<ModalContextValue | null>(null);

export default function ModalProvider({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isClosing, setIsClosing] = useState(false);
  const closingTimer = useRef<NodeJS.Timeout | null>(null);
  const fadeOutTimer = useRef<NodeJS.Timeout | null>(null);

  const openModal: ModalContextValue = useCallback((message, { onUnmount, duration = 3000 } = {}) => {
    setIsOpen(true);
    setMessage(message);

    if (closingTimer.current) {
      clearTimeout(closingTimer.current);
      closingTimer.current = null;
    }
    if (fadeOutTimer.current) {
      clearTimeout(fadeOutTimer.current);
    }

    closingTimer.current = setTimeout(() => {
      setIsClosing(true);
      fadeOutTimer.current = setTimeout(() => {
        setIsOpen(false);
        setIsClosing(false);
        onUnmount?.();
      }, 200);
    }, duration);
  }, []);

  return (
    <ModalContext.Provider value={openModal}>
      {children}
      <Portal>{isOpen && <Modal isClosing={isClosing}>{message}</Modal>}</Portal>
    </ModalContext.Provider>
  );
}

const MountAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-40px);
    padding: 10px 20px;
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
    padding: 20px 40px;
  }
`;

const Modal = styled.div<{ isClosing: boolean }>`
  position: fixed;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  ${({ isClosing }) => (isClosing ? 'opacity: 0;' : '')}
  padding: 20px 40px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.color.WHITE};
  box-shadow: 0 4px 10px rgb(0 0 0 / 17%);
  font-weight: 700;
  font-size: 18px;
  text-align: center;
  transition: opacity 0.2s;
  transform-origin: center center;
  animation: ${MountAnimation} 0.2s ease-in-out;
`;
