import styled from "../../themes/styled";

export const Root = styled.div`
  position: relative;
  height: 30px;
  width: 30px;

  & > svg {
    height: 100%;
    width: 100%;
  }
`;

export const Text = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  text-align: center;
  transform: translate(-50%, -50%);
`;

export const Popup = styled.div`
  & > ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;

export const Obstruction = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 30px;
  height: 30px;
`;
