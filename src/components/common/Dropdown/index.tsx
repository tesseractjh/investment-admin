import styled from 'styled-components';
import type { TableFilter } from '../Table/Filter';

type Props = {
  filter: TableFilter;
  value: string;
  handleChange: React.ChangeEventHandler;
};

export default function Dropdown({ filter, value, handleChange }: Props) {
  const { id, label, options } = filter;
  const elementId = `select-${id}`;

  return (
    <Container>
      <Label htmlFor={elementId}>{label}</Label>
      <Select id={elementId} onChange={handleChange} value={value}>
        <Option value="">선택 안 함</Option>
        {options.map(({ option, value }) => (
          <Option key={option} value={String(value)}>
            {option}
          </Option>
        ))}
      </Select>
    </Container>
  );
}

const Container = styled.div`
  width: 150px;
  &:hover > label {
    color: ${({ theme }) => theme.color.SECONDARY};
  }
`;

const Label = styled.label`
  display: inline-block;
  width: 100%;
  margin-bottom: 6px;
  font-weight: 700;
  font-size: 14px;
`;

const Select = styled.select`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.color.PRIMARY};
`;

const Option = styled.option``;
