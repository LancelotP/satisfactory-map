import styled from "../../themes/styled";

type RootProps = {
  color: "white" | "black" | "primary";
};

export const Root = styled.button<RootProps>`
  background-color: ${({ color }) => (color === "primary" ? "pink" : "white")};
`;
