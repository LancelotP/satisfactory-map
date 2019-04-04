import React from "react";

import * as S from "./Button.style";

export type ButtonProps = {
  children: any;
  /**
   * Size of the button
   *
   * @default "small"
   */
  size?: "small" | "medium" | "large";
  /**
   * Color of the button
   *
   * @default "primary"
   */
  color?: "primary" | "white";
};

export const Button = (props: ButtonProps) => {
  const { size = "medium", color = "primary" } = props;

  return (
    <S.Root color={color}>
      <div>{props.children}</div>
    </S.Root>
  );
};

export default Button;
