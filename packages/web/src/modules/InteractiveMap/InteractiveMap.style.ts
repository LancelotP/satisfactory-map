import styled from "../../themes/styled";

export const Menu = styled.aside`
  overflow: auto;
  height: calc(100vh - 64px);
  max-width: calc(100vw - 48px);
  transition: width 0.242s ease;
`;

export const Root = styled.div<{ menuOpen: boolean }>`
  flex: 1 1 auto;
  display: flex;

  & > ${Menu} {
    width: ${({ menuOpen }) => (menuOpen ? 250 : 0)}px;
  }

  @media (min-width: 1200px) {
    & > ${Menu} {
      width: 250px;
    }
  }
`;

export const Content = styled.div`
  flex: 1 1 auto;
  position: relative;

  & .leaflet-div-icon {
    background: transparent;
    border: none;
  }
`;

export const MenuIcon = styled.div`
  position: absolute;
  left: 0;
  bottom: 64px;
  background: white;
  padding: 12px;
  z-index: 10000;
  border-radius: 0 4px 4px 0;
  display: flex;
  cursor: pointer;
`;
