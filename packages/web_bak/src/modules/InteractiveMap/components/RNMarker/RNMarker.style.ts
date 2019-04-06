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

export const Letter = styled.div`
  position: absolute;
  width: 100%;
  text-align: center;
`;
