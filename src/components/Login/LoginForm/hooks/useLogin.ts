import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import API from '@api/index';
import useModal from '@hooks/useModal';

const ERROR_MSG = {
  invalidInputEmail: '아이디는 이메일 형식으로 입력해야 합니다!',
  invalidInputPassword: '비밀번호는 4글자 이상 입력해야 합니다!',
  userNotFound: '아이디 또는 비밀번호가 올바르지 않습니다!',
};

const SERVER_ERROR_MSG = {
  userNotFound: 'Cannot find user',
  incorretPassword: 'Incorrect password',
};

const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

const handleChange =
  (setState: React.Dispatch<React.SetStateAction<string>>) =>
  ({ currentTarget: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setState(value);
  };

export default function useLogin() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const openModal = useModal();

  const handleIdChange = useCallback(handleChange(setUserId), []);
  const handlePasswordChange = useCallback(handleChange(setPassword), []);
  const handleLogin = async () => {
    if (!userId.match(EMAIL_REGEX)) {
      openModal(ERROR_MSG.invalidInputEmail);
      return;
    }

    if (password.length < 4) {
      openModal(ERROR_MSG.invalidInputPassword);
      return;
    }

    const { data, error } = await API.auth.login({ email: userId, password });

    if (error?.data === SERVER_ERROR_MSG.userNotFound || error?.data === SERVER_ERROR_MSG.incorretPassword) {
      openModal(ERROR_MSG.userNotFound);
      return;
    }

    if (data.accessToken) {
      window.localStorage.setItem('accessToken', data.accessToken);
      router.push('/');
    }
  };

  return { userId, password, handleIdChange, handlePasswordChange, handleLogin };
}
