import styled from "../../../../themes/styled";

export const Menu = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: flex-start;
`;

export const Btn = styled.div`
  padding: 16px;
  border-radius: 4px;
  background: #f69e28;
`;

export const Content = styled.div`
  margin-right: 8px;
  border-radius: 4px;
  display: none;
  background: #f69e28;
  padding: 16px 24px;

  & > ul {
    margin: 0;
    padding: 0;
    list-style: none;

    & > li {
      & > label {
        cursor: pointer;
        display: flex;
        align-items: center;

        & > input {
          margin-right: 8px;
        }
      }
    }
  }
`;

export const Root = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;

  &:hover ${Content} {
    display: block;
  }
`;
