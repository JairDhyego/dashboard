import styled, { keyframes } from "styled-components";

const animate = keyframes`
0%{
  transform: translateX(100px);
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

export const Container = styled.div`
  width: 48%;
  min-height: 260px;
  margin: 10px 0;
  background-color: ${(props) => props.theme.colors.tertiary};
  color: ${(props) => props.theme.colors.white};

  border-radius: 7px;

  display: flex;
  animation: ${animate} 0.8s;

  @media (max-width: 1200px) {
    display: flex;
    flex-direction: column;

    width: 100%;
    height: auto;
  }
`;

export const SideLeft = styled.aside`
  flex: 1;
  padding: 30px 20px;
  > h3 {
    padding-left: 16px;
    margin-bottom: 10px;
  }
`;

export const SideRight = styled.main`
  flex: 1;
  min-height: 150px;

  display: flex;
  justify-content: center;

  padding-top: 35px;
`;

export const LegendContainer = styled.ul`
  max-height: 175px;
  padding-left: 15px;

  overflow-y: scroll;

  list-style: none;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.secondary};
    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.tertiary};
  }

  @media (max-width: 1200px) {
    display: flex;
    height: auto;
  }
`;

interface ILegendProps {
  color: string;
}

export const Legend = styled.li<ILegendProps>`
  display: flex;
  align-items: center;

  margin-bottom: 7px;
  padding-left: 16px;

  > div {
    background-color: ${(props) => props.color};
    font-size: 14px;
    line-height: 40px;
    text-align: center;

    width: 40px;
    height: 40px;
    border-radius: 5px;
  }
  > span {
    margin-left: 5px;
  }

  @media (max-width: 1200px) {
    > div {
      width: 30px;
      height: 30px;

      font-size: 10px;
      line-height: 30px;
    }
  }
`;
