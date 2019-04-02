import styled from "../../themes/styled";

export const Menu = styled.aside`
  overflow: auto;
  height: 100vh;
  max-width: calc(100vw - 48px);
  transition: width 0.242s ease;
`;

export const MenuIcon = styled.div`
  position: absolute;
  left: 0;
  top: 82px;
  background: white;
  padding: 12px;
  z-index: 10000;
  border-radius: 0 4px 4px 0;
  display: flex;
  cursor: pointer;
`;

export const Root = styled.div<{ menuOpen: boolean }>`
  flex: 1 1 auto;
  display: flex;

  & > ${Menu} {
    width: ${({ menuOpen }) => (menuOpen ? 300 : 0)}px;
  }

  @media (min-width: 1200px) {
    & > ${Menu} {
      width: 300px;
    }

    & ${MenuIcon} {
      display: none;
    }
  }
`;

export const Content = styled.div`
  flex: 1 1 auto;
  position: relative;

  & > #s_map {
    background-color: #5f5e5a;
    height: 100%;
    width: 100%;
  }

  & .leaflet-div-icon {
    background: transparent;
    border: none;
  }
`;

export const LocateMe = styled.div`
  display: none;

  @media (min-width: 1020px) {
    display: block;
  }

  position: absolute;
  z-index: 1000;
  top: 16px;
  right: 16px;
`;
