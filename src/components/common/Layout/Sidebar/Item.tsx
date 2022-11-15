import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

type Props = {
  url: string;
  name: string;
  icon: React.ReactNode;
  isSelected: boolean;
};

function Item({ url, name, icon, isSelected }: Props) {
  return (
    <Container>
      <Link href={url} passHref>
        <Anchor isSelected={isSelected}>
          {icon}
          <ItemName>{name}</ItemName>
        </Anchor>
      </Link>
    </Container>
  );
}

const Container = styled.li``;

const Anchor = styled.a<{ isSelected: boolean }>`
  ${({ theme }) => theme.mixin.inlineFlex('flex-start')}
  width: 100%;
  padding: 16px 24px;
  color: ${({ theme }) => theme.color.GRAY};

  & > svg {
    width: 16px;
    height: 16px;
    margin-right: 16px;
    fill: ${({ theme }) => theme.color.GRAY};
  }

  ${({ isSelected, theme }) =>
    isSelected
      ? `
        background-color: ${theme.color.SECONDARY};
        color: ${theme.color.WHITE};

        & > svg {
          fill: ${theme.color.WHITE};
        }
      `
      : `
        &:hover {
          background-color: ${theme.color.LOGO};
        }
      `}
`;

const ItemName = styled.span`
  flex: 1;
`;

export default React.memo(Item);
