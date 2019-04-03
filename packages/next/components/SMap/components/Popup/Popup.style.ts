import styled from "../../../../themes/styled";

export const Root = styled.div`
  & > ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  & > p:first-child {
    text-align: center;
    font-weight: bold;
    margin: 16px 0;
  }
`;
