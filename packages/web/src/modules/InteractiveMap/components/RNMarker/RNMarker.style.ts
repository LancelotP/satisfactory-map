import styled from "../../../../themes/styled";

export const Root = styled.div`
  position: relative;

  & > svg {
    height: 100%;
    width: 100%;
  }
`;

export const Obstruction = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 30px;
  height: 30px;
`;
