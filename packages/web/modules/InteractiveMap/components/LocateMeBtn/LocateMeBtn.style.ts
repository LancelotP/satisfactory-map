import { transparentize } from "polished";
import styled from "../../../../themes/styled";

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

export const ModalBody = styled.div`
  color: ${({ theme }) => theme.colors.black};
`;

export const Path = styled.code`
  margin: 8px 0;
  display: block;
  padding: 8px;
  color: black;
  background: ${({ theme }) => transparentize(0.5, theme.colors.black)};
`;

export const Note = styled.p`
  margin: 12px 0 0;
  font-size: 12px;
`;

export const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 16px;

  & > button + button {
    margin-left: 8px;
  }
`;
