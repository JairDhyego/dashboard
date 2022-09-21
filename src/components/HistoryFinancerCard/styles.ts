import styled, { keyframes } from "styled-components";

interface ITagProps {
  color: string;
}

const animate = keyframes`
0%{
  transform: translateX(-100px);
  opacity: 0;
}
50%{

  opacity: 0.3;
}
100%{
  transform: translateX(0px);
  opacity: 1;
}
`;

export const Container = styled.li`
  font-size: 18px;
  color: #ccc;

  background-color: ${(props) => props.theme.colors.tertiary};
  list-style: none;
  border-radius: 10px;

  margin: 10px 0px;
  padding: 12px 0px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  position: relative;

  transition: all 0.3s;
  animation: ${animate} 0.8s;

  &:hover {
    opacity: 0.7;
    transform: translateX(10px);
  }

  .conteudo {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 15px;

    span {
      font-weight: bold;
      font-size: 18px;
    }
  }
`;

export const Tag = styled.div<ITagProps>`
  position: absolute;
  width: 10px;
  height: 45px;
  left: 0;

  background-color: ${(props) => props.color};
`;
