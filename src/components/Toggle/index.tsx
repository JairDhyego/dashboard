import React from "react";

import { Container, ToggleLabel, ToggleSelector } from "./styles";

interface IToggle {
  labelLeft: string;
  labelRight: string;
  checked: boolean;
  onChange(): void;
}

const Toggle = ({ labelLeft, labelRight, checked, onChange }: IToggle) => {
  return (
    <Container>
      <ToggleLabel>{labelLeft}</ToggleLabel>
      <ToggleSelector
        checked={checked}
        uncheckedIcon={false}
        checkedIcon={false}
        onChange={onChange}
      />
      <ToggleLabel>{labelRight}</ToggleLabel>
    </Container>
  );
};

export default Toggle;
