import styled from "styled-components";

export const Container = styled.div`
  grid-area: MH;
  color: ${({ theme }) => theme.colors.white};
  background: ${(props) => props.theme.colors.secondary};

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 10px;

  border-bottom: 1px solid ${(props) => props.theme.colors.gray};
`;

export const Profile = styled.div`
  color: 1px solid ${(props) => props.theme.colors.white};
`;

export const Welcome = styled.h3``;

export const UserName = styled.span``;
