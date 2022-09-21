import React from "react";
import { Container } from "./styles";

interface ISelectInputProps {
  options: {
    value: string | number;
    label: string | number;
  }[];
  onChange(event: React.ChangeEvent<HTMLSelectElement>): void | undefined;
  defaultValue?: string | number;
}

const SelectInput = ({
  options,
  onChange,
  defaultValue,
}: ISelectInputProps) => {
  return (
    <Container>
      <select name="" id="" onChange={onChange} defaultValue={defaultValue}>
        {options.map((option) => (
          <option key={option.label} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </Container>
  );
};

export default SelectInput;
