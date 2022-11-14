import { css } from 'styled-components';

export const FormStyle = css`
  padding: 10px 20px;
  border: 1px solid ${({ theme }) => theme.color.BORDER};
  border-radius: 3px;

  & > svg {
    width: 16px;
    height: 16px;
    margin-right: 10px;
  }
`;
