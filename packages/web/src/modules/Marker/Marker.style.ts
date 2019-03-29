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
