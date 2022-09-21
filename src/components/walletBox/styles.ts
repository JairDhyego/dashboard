import styled from "styled-components";

interface IcontainerProps {
  color: string;
}

export const Container = styled.div<IcontainerProps>`
  width: 32%;
  height: 150px;
  margin: 10px 0;

  background-color: ${(props) => props.color};
  color: ${(props) => props.theme.colors.white};

  border-radius: 7px;
  padding: 2px 10px;
  position: relative;
  overflow: hidden;

  > img {
    position: absolute;
    height: 110%;
    top: -10px;
    right: -40px;

    opacity: 0.3;
  }

  > span {
    font-size: 20px;
    font-weight: 500;
  }

  > small {
    font-size: 12px;
    position: absolute;
    bottom: 10px;
  }

  @media (max-width: 770px) {
    > span {
      font-size: 14px;
    }

    > h3 {
      word-wrap: break-word;
      font-size: 22px;
    }
  }

  @media (max-width: 420px) {
    width: 100%;
  }
`;
