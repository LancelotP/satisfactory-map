import styled from "../../../../themes/styled";

export const Button = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 99999;
  background: ${({ theme }) => theme.colors.primary500};
  font: inherit;
  border: 0;
  padding: 5px 10px;
  color: white;

  &:hover,
  &focus {
    background: ${({ theme }) => theme.colors.primary700};
  }
`;
