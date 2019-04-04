import styled from "../../themes/styled";

import { Root as MenuRoot } from "./components/Menu/Menu.style";

export const Root = styled.div`
  position: relative;
  display: flex;
  height: 100%;

  & > ${MenuRoot} {
    width: 300px;
    flex: 0 0 auto;
  }

  & .leaflet-container {
    background-color: #7b7b75;
  }

  & .leaflet-div-icon {
    background: none;
    border: none;
  }
`;

export const Overlay = styled.div`
  z-index: 1000;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const Modal = styled.div`
  background: white;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 48px;
  flex: 1 1 auto;
`;

export const ModalTop = styled.div`
  padding: 24px;
`;

export const ModalContent = styled.div`
  padding: 0 24px;
`;

export const ModalBottom = styled.div`
  display: flex;
  padding: 16px 24px;
  align-items: center;
  justify-content: flex-end;
`;
