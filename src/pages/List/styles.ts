import styled from "styled-components";

export const Container = styled.div``;

export const Content = styled.main``;

export const Filters = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  width: 100%;

  .tag-filter {
    font-size: 18px;
    font-weight: 500;
    background: none;
    color: ${(props) => props.theme.colors.white};
    margin: 0 10px;
    opacity: 0.4;
    transition: 0.3s;

    &:hover {
      opacity: 0.7;
    }
  }

  .tag-filter-recurrent {
    &::after {
      content: "";
      display: block;
      width: 55px;
      margin: 0 auto;
      border-bottom: 10px solid ${(props) => props.theme.colors.sucess};
    }
  }
  .tag-filter-eventual {
    &::after {
      content: "";
      display: block;
      width: 55px;
      margin: 0 auto;
      border-bottom: 10px solid ${(props) => props.theme.colors.warning};
    }
  }

  .tag-actived {
    opacity: 1;
  }
`;
