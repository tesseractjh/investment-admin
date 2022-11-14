import React from 'react';
import styled from 'styled-components';

type Props = {
  icon: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>;

function Input({ icon, ...props }: Props) {
  return (
    <Container>
      {icon}
      <StyledInput {...props} />
    </Container>
  );
}

const Container = styled.div`
  ${({ theme }) => theme.mixin.flex('flex-start', 'center')}
`;

const StyledInput = styled.input`
  flex: 1;
  font-size: 18px;

  &::placeholder {
    color: ${({ theme }) => theme.color.BORDER};
  }
`;

export default React.memo(Input);
