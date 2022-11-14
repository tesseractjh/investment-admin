import React from 'react';
import styled from 'styled-components';
import UserIcon from '@assets/icons/user.svg';
import LockIcon from '@assets/icons/lock.svg';
import LoginIcon from '@assets/icons/login.svg';
import Input from './Input';
import { FormStyle } from './Styled';
import useLogin from './hooks/useLogin';

export default function LoginForm() {
  const { userId, password, handleIdChange, handlePasswordChange, handleLogin } = useLogin();

  return (
    <Container>
      <Input
        icon={<UserIcon />}
        value={userId}
        onChange={handleIdChange}
        type="email"
        placeholder="아이디를 입력하세요"
      />
      <Input
        icon={<LockIcon />}
        value={password}
        onChange={handlePasswordChange}
        type="password"
        placeholder="비밀번호를 입력하세요"
      />
      <Button type="button" disabled={Boolean(!userId || !password)} onClick={handleLogin}>
        <LoginIcon />
        로그인
      </Button>
    </Container>
  );
}

const Container = styled.form`
  ${({ theme }) => theme.mixin.flexColumn('space-between', 'stretch', '20px')}
  padding: 20px 30px 40px;
  background-color: ${({ theme }) => theme.color.WHITE};

  & > * {
    ${FormStyle}
  }

  & > svg {
    fill: ${({ theme }) => theme.color.BORDER};
  }
`;

const Button = styled.button`
  ${({ theme }) => theme.mixin.inlineFlex()}

  &:disabled {
    background-color: ${({ theme }) => theme.color.BACKGROUND};
    color: ${({ theme }) => theme.color.BORDER};
    cursor: not-allowed;

    & > svg {
      fill: ${({ theme }) => theme.color.BORDER};
    }
  }

  &:not(:disabled) {
    border-color: ${({ theme }) => theme.color.GRAY};

    &:hover {
      border-color: ${({ theme }) => theme.color.PRIMARY};
    }
  }
`;
