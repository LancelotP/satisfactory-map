import styled from "../../themes/styled";

import { Root as MenuRoot } from "./components/Menu/Menu.style";

export const Root = styled.div`
  display: flex;
  height: 100%;

  & > ${MenuRoot} {
    width: 300px;
    flex: 0 0 auto;
  }

  & .leaflet-div-icon {
    background: none;
    border: none;
  }
`;
