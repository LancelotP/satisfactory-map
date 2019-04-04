import styled from "../../../../themes/styled";

export const Obstruction = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 30px;
  height: 30px;
`;

export const Root = styled.div`
  position: relative;
  /* height: 30px;
  width: 30px; */

  & > svg {
    height: 100%;
    width: 100%;
  }
`;

export const Letter = styled.div`
  position: absolute;
  width: 100%;
  text-align: center;
`;
