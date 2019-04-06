import styled from "../../themes/styled";

export const Button = styled.button`
  width: 100%;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0;
  outline: none;
  border: none;
  font-size: 16px;
  line-height: 20px;
  color: white;
  background: ${({ theme }) => theme.colors.primary500};
  cursor: pointer;
  transition: background 0.242s ease;
  font-family: "ibm_plex";
  font-weight: bold;

  &:hover,
  &focus {
    background: ${({ theme }) => theme.colors.primary700};
  }
`;
