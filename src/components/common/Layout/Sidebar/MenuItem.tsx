import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { Menu } from '../constants/menu';
import useSidebarItem from '../hooks/useSidebarItem';

type Props = {
  menu: Menu;
  isSelected: boolean;
};

function MenuItem({ menu, isSelected }: Props) {
  const { type, url, name, icon: Icon, useClick } = menu;
  const handleClick = useSidebarItem(url, useClick);

  return (
    <Container>
      {type === 'link' ? (
        <Link href={url} passHref>
          <Anchor isSelected={isSelected}>
            <Icon />
            <ItemName>{name}</ItemName>
          </Anchor>
        </Link>
      ) : (
        <Anchor as="button" type="button" isSelected={isSelected} onClick={handleClick}>
          <Icon />
          <ItemName>{name}</ItemName>
        </Anchor>
      )}
    </Container>
  );
}

const Container = styled.li``;

const Anchor = styled.a<{ isSelected: boolean }>`
  ${({ theme }) => theme.mixin.inlineFlex('flex-start')}
  width: 100%;
  padding: 16px 24px;
  text-align: left;
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

export default React.memo(MenuItem);
