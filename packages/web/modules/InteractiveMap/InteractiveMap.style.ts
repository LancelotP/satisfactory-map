import styled from "../../themes/styled";

import { Root as MenuRoot } from "./components/Menu/Menu.style";

export const Root = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;

  & > ${MenuRoot} {
    flex: 0 0 auto;
    max-width: calc(100vw - 60px);
  }
`;
